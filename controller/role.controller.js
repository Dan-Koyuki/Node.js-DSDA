import Role from "../models/role.model.js";
import CustomError from "../utility/customError.js"

class RoleController {
    add = async ({name, position}) => {
        if (!name) {
            throw new CustomError("Nama tidak boleh kosong!", 400);
        }
        if (!position) {
            throw new CustomError("Posisi tidak boleh kosong!", 400);
        }

        let role = await Role.findOne({position: position});
        console.log(role);
        if (role) {
            throw new CustomError("Jabatan sudah ada!", 409);
        }

        role = new Role({
            name: name,
            position: position
        });

        role = await role.save();
        console.log("Saved");

        return {
            statusCode: 201,
            data: {
                role: role
            }
        }
    }


}

const roleController = new RoleController();

export default roleController;