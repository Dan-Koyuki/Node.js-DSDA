import Authority from "../models/authority.model"
import CustomError from "../utility/customError"

class AuthorityController {
    create = async ({desc}) => {
        if (!desc) {
            throw new CustomError("Deskripsi harus diisi!", 400)
        }

        const authority = new Authority({
            authorDesc: desc
        });

        await authority.save();

        return authority
    }

    update = async ({data, id}) => {
        if (!id) {
            return this.create({desc: data.desc});
        } else {
            // logic if id exist
            let authority = await Authority.findById(id);
            if (!authority) {
                throw new CustomError("Form Tidak Ditemukan!", 404);
            }

            authority.authorDesc = data.desc;

            await authority.save();

            return authority;
        }
    }
}

const authorityController = new AuthorityController();

export default authorityController;