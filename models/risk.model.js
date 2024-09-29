const { default: mongoose } = require("mongoose");

const riskScheme = new mongoose.Schema(
  {
    riskName: {type: String, required: true}, // Nama Resiko
    reason: {type: String, required: true}    // Penyebab
  },
  { timestamps: true }
);

const Risk = mongoose.model("Risk", riskScheme);

export default Risk;
