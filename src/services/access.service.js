"use strict";

const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/auth.utils");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");

const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // step 1: check email exists
    const hodelShop = await shopModel.findOne({ email }).lean();

    if (hodelShop) {
      throw new BadRequestError("Error: Shop already registered");
    }

    const passwordHash = await bycrypt.hash(password, 10);

    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RolesShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      console.log({ privateKey, publicKey }); // save document to collection KeyStore

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxxx",
          message: "PublicKeyString error",
        };
      }
      // create token pair
      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
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
  };
}

module.exports = AccessService;
