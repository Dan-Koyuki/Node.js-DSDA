const { default: mongoose } = require("mongoose");

const jobScheme = new mongoose.Schema(
  {
    // another field for job
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobScheme);

export default Job;
