"use strick";

const { model, Schema } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "api_key";
const COLLECTION_NAME = "api_keys";

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: ["000", "111", "222"],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
