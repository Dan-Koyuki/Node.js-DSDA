import mongoose from "mongoose";

const resultScheme = new mongoose.Schema(
  {
    result: {type: String, required: true},     // Hasil Kerja
    resultType: {type: String, required: true}, // Satuan Hasil Kerja
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultScheme);

export default Result;
