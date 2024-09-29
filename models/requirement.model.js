const { default: mongoose } = require("mongoose");

const requirementScheme = new mongoose.Schema(
  {
    skill: { type: String, required: true},       // Keterampilan Kerja
    ability: {type: String, required: true},      // Bakat Kerja
    temperament: { type: String, required: true}, // Temperamen Kerja
    interest: { type: String, required: true},    // Minat Kerja
    effort: { type: String, required: true},      // Upaya Fisik
    condition: {type: String, required: true}     // Kondisi Fisik
  },
  { timestamps: true }
);

const Requirement = mongoose.model("Requirement", requirementScheme);

export default Requirement;
