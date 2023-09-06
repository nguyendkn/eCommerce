"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const COUNTER = 5000;

// count connnections
const connections = () => {
  const connects = mongoose.connections.length;
  return connects;
};

// check overload connection
const checkOverload = () => {
  setInterval(() => {
    const numberConnections = connections();
    const numberCores = os.cpus().length;
    const memoriesUsage = process.memoryUsage().rss;
    // Example maximum number of connections based on number asf cores
    const maxConnections = numberCores * 5;

    console.log(`---------------------------------------`);
    console.log(`Active connection: ${numberConnections}`);
    console.log(`Memory usage: ${memoriesUsage / 1024 / 1024} MB`);
    console.log(`---------------------------------------`);

    if (numberConnections > maxConnections) {
      console.log("Connection overload detected");
    }
  }, COUNTER) /* Monitor database every 5 seconds */;
};

module.exports = {
  connects: connections,
  checkOverload,
};
