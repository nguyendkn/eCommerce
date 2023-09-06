"use strict";

const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/auth.utils");
const { getInfoData } = require("../utils");

const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exists
      const hodelShop = await shopModel.findOne({ email }).lean();

      if (hodelShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
      }

      const passwordHash = await bycrypt.hash(password, 10);

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RolesShop.SHOP],
      });

      if (newShop) {
        // create privateKey (sign token), publicKey (verify token)
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        console.log({ privateKey, publicKey }); // save document to collection KeyStore

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "PublicKeyString error",
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        console.log("publicKeyObject::", publicKeyObject);

        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyString,
          privateKey
        );
        console.log("Created Token Success::", tokens);
        const payload = getInfoData({
          fields: ["_id", "name", "email"],
          object: newShop,
        });
        return {
          code: 201,
          metadata: {
            shop: payload,
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;