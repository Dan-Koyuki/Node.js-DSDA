const { default: mongoose } = require("mongoose");

const classScheme = new mongoose.Schema(
  {
    jobClass: {type: String, required: true}
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classScheme);

export default Class;
