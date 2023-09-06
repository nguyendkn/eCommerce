"use strict";

const express = require("express");
const { apiKey, permissions } = require("../auth/checkAuth");
const router = express.Router();

// check apiKey
router.use(apiKey);
router.use(permissions("000"));
// check permissions

router.use("/v1/api", require("./access"));

module.exports = router;
