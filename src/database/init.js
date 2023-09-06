"use strict";

const mongoose = require("mongoose");
const {
  database: { host, port, name },
} = require("../configs/mongodb.config");
const { connects } = require("../helpers/check.connect");

const connectionString = `mongodb://${host}:${port}/${name}`;

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
