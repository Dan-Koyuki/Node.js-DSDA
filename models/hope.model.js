import mongoose from "mongoose";

// Prestasi yang Diharapkan
const hopeScheme = new mongoose.Schema(
  {
    feat: { type: String, required: true} // Prestasi Kerja yang Diharapkan
  },
  { timestamps: true }
);

const Hope = mongoose.model("Hope", hopeScheme);

export default Hope;
