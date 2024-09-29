import mongoose from "mongoose";

// Kelas Jabatan
const classScheme = new mongoose.Schema(
  {
    jobClass: {type: String, required: true}  // Kelas Kerja yang Diharapkan
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classScheme);

export default Class;
