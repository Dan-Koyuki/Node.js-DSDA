const { default: mongoose } = require("mongoose");

const correlationScheme = new mongoose.Schema(
  {
    roleName: {type: String, required: true},
    unit: {type: String, required: true},
    term: {type: String, required: true}
  },
  { timestamps: true }
);

const Correlation = mongoose.model("Correlation", correlationScheme);

export default Correlation;
