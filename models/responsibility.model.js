const { default: mongoose } = require("mongoose");

const responsibilityScheme = new mongoose.Schema(
  {
    desc: {type: String, required: true}
  },
  { timestamps: true }
);

const Responsibility = mongoose.model("Responsibility", responsibilityScheme);

export default Responsibility;
