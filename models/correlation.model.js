import mongoose from "mongoose";

// Korelasi Jabatan
const correlationScheme = new mongoose.Schema(
  {
    roleName: {type: String, required: true},   // Nama Jabatan 
    unit: {type: String, required: true},       // Unit Kerja/Instansi
    term: {type: String, required: true}        // Dalam Hal
  },
  { timestamps: true }
);

const Correlation = mongoose.model("Correlation", correlationScheme);

export default Correlation;
