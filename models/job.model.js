import mongoose from "mongoose";

const jobScheme = new mongoose.Schema(
  {
    relatedJob: { type: String, required: true},      // Uraian Tugas Terkait
    relatedJobDesc: {type: String, required: true},   // Tuliskan Uraian Tugas
    result: {type: String, required: true},           // Hasil Kerja
    resultType: {type: String, required: true},       // Satuan Hasil Kerja
    workload: {type:String, required: true},          // Beban Kerja 1 Tahun
    completionTime: {type: String, required: true},   // Waktu Penyelesaian (jam/menit)
    effectiveJobTime: {type: String, required: true}, // Waktu Kerja Efektif 1 tahun
    employmentNeed: {type: String, required: true},   // Kebutuhan Pegawai
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobScheme);

export default Job;
