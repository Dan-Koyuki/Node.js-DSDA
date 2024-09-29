import mongoose from "mongoose";

const responsibilityScheme = new mongoose.Schema(
  {
    desc: {type: String, required: true}  // Uraian Tanggung Jawab
  },
  { timestamps: true }
);

const Responsibility = mongoose.model("Responsibility", responsibilityScheme);

export default Responsibility;
