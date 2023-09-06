"use strict";

const { findById } = require("../services/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY];
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    //check objKey
    const objectKey = await findById(key);
    if (!objectKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.objectKey = objectKey;
    return next();
  } catch (error) {}
};

const permissions = (permissions) => {
  return (req, res, next) => {
    if (!req.objectKey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    console.log(req.objectKey.permissions);
    const validPermissions = req.objectKey.permissions.includes(permissions);
    if (!validPermissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  apiKey,
  permissions,
  asyncHandler
};
