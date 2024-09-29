const { default: mongoose } = require("mongoose");

const jobScheme = new mongoose.Schema(
  {
    relatedJob: { type: String, required: true},
    relatedJobDesc: {type: String, required: true},
    result: {type: String, required: true},
    resultType: {type: String, required: true},
    workload: {type:String, required: true},
    completionTime: {type: String, required: true},
    effectiveJobTime: {type: String, required: true},
    employmentNeed: {type: String, required: true},
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobScheme);

export default Job;
