const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    data: {type: mongoose.Schema.Types.ObjectId, ref: "Data"}, // Data Jabatan
    job: {type: mongoose.Schema.Types.ObjectId, ref:"Job"}, // Tugas Pokok
    result: {type: mongoose.Schema.Types.ObjectId, ref:"Result"}, // Hasil Kerja
    material: {type: mongoose.Schema.Types.ObjectId, ref:"Material"}, // Bahan Kerja
    set: {type: mongoose.Schema.Types.ObjectId, ref:"Set"}, // Perangkat Kerja
    responsibility: {type: mongoose.Schema.Types.ObjectId, ref:"Responsibility"}, // Tanggung Jawab
    authority: {type: mongoose.Schema.Types.ObjectId, ref:"Authority"}, // Wewenang
    correlation: {type: mongoose.Schema.Types.ObjectId, ref:"Correlation"}, // Korelasi Kerja
    risk: {type: mongoose.Schema.Types.ObjectId, ref:"Risk"}, // Resiko Bahaya
    requirement: {type: mongoose.Schema.Types.ObjectId, ref:"Requirement"}, // Syarat Kerja
    hope: {type: mongoose.Schema.Types.ObjectId, ref:"Hope"}, // Prestasi yang Diharapkan
    class: {type: mongoose.Schema.Types.ObjectId, ref:"Class"}, // Kelas Jabatan
    sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
