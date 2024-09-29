const { default: mongoose } = require("mongoose");

const dataScheme = new mongoose.Schema({
  roleCode: { type: String, required: true },       // Kode Jabatan
  unit: { type: String, required: true },           // Unit Kerja
  jpt: { type: String, required: true },            // JPT Utama
  madya: { type: String, required: true },          // JPT Madya
  pratama: { type: String, required: true },        // JPT Pratama
  administrator: { type: String, required: true },  // Administrator
  advisor: { type: String, required: true },        // Pengawas
  implementer: { type: String, required: true},     // Pelaksana
  functional: { type: String, required: true},      // Jabatan Fungsional
  overview: { type: String, requierd: true}         // Ikhtisar Jabatan
}, {timestamps: true});

const Data = mongoose.model("Data", dataScheme);

export default Data;