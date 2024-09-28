const { default: mongoose } = require("mongoose");

const dataScheme = new mongoose.Schema({
  // another field for data
}, {timestamps: true});

const Data = mongoose.model("Data", dataScheme);

export default Data;