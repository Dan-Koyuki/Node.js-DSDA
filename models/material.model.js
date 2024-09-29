import mongoose from "mongoose";

// Bahan Kerja
const materialScheme = new mongoose.Schema(
  {
    material: {type: String, required: true}, // Uraian Bahan Kerja
    usage: {type: String, required:true}      // Penggunaan Dalam Tugas
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialScheme);

export default Material;
