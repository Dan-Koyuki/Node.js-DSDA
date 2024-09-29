const { default: mongoose } = require("mongoose");

const resultScheme = new mongoose.Schema(
  {
    result: {type: String, required: true},
    resultType: {type: String, required: true},
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultScheme);

export default Result;
