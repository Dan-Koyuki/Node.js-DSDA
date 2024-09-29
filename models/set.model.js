import mongoose from "mongoose";

const setScheme = new mongoose.Schema(
  {
    setName: {type: String, required: true},  // Perangkat Kerja
    usage: {type: String, required: true}     // Penggunaan Untuk Tugas
  },
  { timestamps: true }
);

const Set = mongoose.model("Set", setScheme);

export default Set;
