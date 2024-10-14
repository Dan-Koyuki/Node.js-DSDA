import Hope from "../models/hope.model.js";
import CustomError from "../utility/customError.js"

class HopeController {
    create = async ({feats}) => {
        if (!feats) {
            throw new CustomError("Prestasi yang diharapkan harus diisi!", 400);
        }

        const hope = new Hope({
            feat: feats
        })

        await hope.save();

        return hope;
    }

    update = async ({data, id}) => {
        if (!id) {
            return await this.create({feats: data.feats});
        } else {
            let hope = await Hope.findById(id)
            if (!hope) {
                throw new CustomError ("Form Tidak Ditemukan", 404)
            }

            hope.feat = data.feats;
            await hope.save();

            return hope;
        }
    }
}

const hopeController = new HopeController();

export default hopeController;