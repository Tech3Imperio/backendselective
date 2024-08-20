const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    whatsappNo: {
      type: String,
      required: true,
    },
    message: {
      type: String, // Ensure type matches the data being sent
      required: true,
    },
  },
  { timestamps: true }
);

const Contactdata = mongoose.model("contactdb", userSchema);

module.exports = Contactdata;
