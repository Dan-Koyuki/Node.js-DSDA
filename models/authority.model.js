const { default: mongoose } = require("mongoose");

const authorityScheme = new mongoose.Schema(
  {
    authorDesc: {type: String, required: true}  // Deskripsi Wewenang
  },
  { timestamps: true }
);

const Authority = mongoose.model("Authority", authorityScheme);

export default Authority;
