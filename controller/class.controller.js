import Class from "../models/class.model";
import CustomError from "../utility/customError"

class ClassController {
    create = async ({jobName}) => {
        if (!jobName) {
            throw new CustomError("Kelas Jabatan harus diisi!", 400);
        }

        const job = new Class({
            jobClass: jobName
        })

        await job.save();

        return job;
    }

    update = async ({data, id}) => {
        if (!id) {
            return await this.create({jobName: data.jobName});
        } else {
            let job = await Class.findById(id)
            if (!job) {
                throw new CustomError ("Form Tidak Ditemukan", 404)
            }

            job.jobClass = data.jobName;
            await job.save();

            return job;
        }
    }
}

const classController = new ClassController();

export default classController;