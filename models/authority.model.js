import mongoose from "mongoose";

// Wewenang
const authorityScheme = new mongoose.Schema(
  {
    authorDesc: {type: String, required: true}  // Deskripsi Wewenang
  },
  { timestamps: true }
);

const Authority = mongoose.model("Authority", authorityScheme);

export default Authority;
