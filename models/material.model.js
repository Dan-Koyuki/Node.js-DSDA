const { default: mongoose } = require("mongoose");

const materialScheme = new mongoose.Schema(
  {
    material: {type: String, required: true},
    usage: {type: String, required:true}
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialScheme);

export default Material;
