import Data from "../models/data.model.js";
import CustomError from "../utility/customError.js"

class DataController {
    create = async (data) => {
        if (!data) {
            throw new CustomError("Form tidak lengkap!", 400);
        }

        const newData = new Data({
            roleCode: data.roleCode,
            unit: data.unit,
            jpt: data.jpt,
            madya: data.madya,
            pratama: data.pratama,
            administrator: data.administrator,
            advisor: data.advisor,
            implementer: data.implementer,
            functional: data.functional,
            overview: data.overview
        });

        await newData.save();

        return newData;
    }

    update = async ({data, id}) => {
        if (!id) {
            return await this.create(data);
        }

        let dataToUpdate = await Data.findById(id);

        if (!dataToUpdate) {
            throw new CustomError("Data tidak ditemukan!", 404);
        }

        // Update fields
        dataToUpdate.roleCode = data.roleCode || dataToUpdate.roleCode;
        dataToUpdate.unit = data.unit || dataToUpdate.unit;
        dataToUpdate.jpt = data.jpt || dataToUpdate.jpt;
        dataToUpdate.madya = data.madya || dataToUpdate.madya;
        dataToUpdate.pratama = data.pratama || dataToUpdate.pratama;
        dataToUpdate.administrator = data.administrator || dataToUpdate.administrator;
        dataToUpdate.advisor = data.advisor || dataToUpdate.advisor;
        dataToUpdate.implementer = data.implementer || dataToUpdate.implementer;
        dataToUpdate.functional = data.functional || dataToUpdate.functional;
        dataToUpdate.overview = data.overview || dataToUpdate.overview;

        await dataToUpdate.save();

        return dataToUpdate;
    }
}

const dataController = new DataController();

export default dataController;