const { default: mongoose } = require("mongoose");

const resultScheme = new mongoose.Schema(
  {
    // another field for result
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultScheme);

export default Result;
