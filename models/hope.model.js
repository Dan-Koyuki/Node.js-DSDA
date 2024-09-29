const { default: mongoose } = require("mongoose");

const hopeScheme = new mongoose.Schema(
  {
    feat: { type: String, required: true}
  },
  { timestamps: true }
);

const Hope = mongoose.model("Hope", hopeScheme);

export default Hope;
