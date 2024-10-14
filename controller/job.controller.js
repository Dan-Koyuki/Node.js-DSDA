import Job from "../models/job.model.js";
import CustomError from "../utility/customError.js";

class JobController {
    create = async (data) => {
        if (!data) {
            throw new CustomError("Form tidak lengkap!", 400);
        }

        const job = new Job({
            relatedJob: data.relatedJob,
            relatedJobDesc: data.relatedJobDesc,
            result: data.result,
            resultType: data.resultType,
            workload: data.workload,
            completionTime: data.completionTime,
            effectiveJobTime: data.effectiveJobTime,
            employmentNeed: data.employmentNeed,
        });

        await job.save();

        return job;
    }

    update = async ({ data, id }) => {
        if (!id) {
            return await this.create(data);
        }

        let jobToUpdate = await Job.findById(id);

        if (!jobToUpdate) {
            throw new CustomError("Data tidak ditemukan!", 404);
        }

        // Update fields
        jobToUpdate.relatedJob = data.relatedJob || jobToUpdate.relatedJob;
        jobToUpdate.relatedJobDesc = data.relatedJobDesc || jobToUpdate.relatedJobDesc;
        jobToUpdate.result = data.result || jobToUpdate.result;
        jobToUpdate.resultType = data.resultType || jobToUpdate.resultType;
        jobToUpdate.workload = data.workload || jobToUpdate.workload;
        jobToUpdate.completionTime = data.completionTime || jobToUpdate.completionTime;
        jobToUpdate.effectiveJobTime = data.effectiveJobTime || jobToUpdate.effectiveJobTime;
        jobToUpdate.employmentNeed = data.employmentNeed || jobToUpdate.employmentNeed;

        await jobToUpdate.save();

        return jobToUpdate;
    }
}

const jobController = new JobController();

export default jobController;
