"use strict";

const mongoose = require("mongoose");
const { connects } = require("../helpers/check.connect");

const connectionString = "mongodb://127.0.0.1:27017/eCommerce";

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) => {
        console.log(`Connected MongoDB Success with ${connects()} connections`);
      })
      .catch((error) => console.log("Error Connect"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const database = Database.getInstance();
module.exports = database;
