import Class from "../models/class.model.js";
import CustomError from "../utility/customError.js";

class ClassController {
    /**
     * Create a new job class
     * @param {String} jobName - Name of the job class to create
     * @returns {Object} - Created job class
     */
    create = async (jobName) => {
        if (!jobName) {
            throw new CustomError("Kelas Jabatan harus diisi!", 400);
        }

        const job = new Class({
            jobClass: jobName
        });

        await job.save();
        return job;
    };

    /**
     * Update an existing job class or create a new one if ID is not provided
     * @param {Object} newData - Object containing jobName
     * @param {String} id - Optional ID of the job class to update
     * @returns {Object} - Updated or newly created job class
     */
    update = async (newData, id) => {
        if (!id) {
            // If no ID is provided, create a new job class
            return await this.create(newData.jobName);
        } else {
            // Find the existing job class by ID
            let job = await Class.findById(id);
            if (!job) {
                throw new CustomError("Form Tidak Ditemukan", 404);
            }

            // Update the job class with the new jobName
            job.jobClass = newData.jobName;
            await job.save();
            return job;
        }
    };
}

const classController = new ClassController();

export default classController;
