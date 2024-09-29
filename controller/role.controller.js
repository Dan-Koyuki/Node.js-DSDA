import Role from "../models/role.model.js";
import CustomError from "../utility/customError.js"

class RoleController {
    add = async ({name}) => {
        if (!name) {
            throw new CustomError("Nama tidak boleh kosong!", 400);
        }

        let role = await Role.findOne({name: name});
        if (role) {
            throw new CustomError("Jabatan sudah ada!", 409);
        }

        role = new Role({
            name: name,
            isTopLevel: true
        });

        role = await role.save();

        return {
            statusCode: 201,
            data: {
                role: role
            }
        }
    }
    
    addSub = async ({parentName, subName}) => {
        if (!parentName) {
            throw new CustomError("Nama tidak boleh kosong!", 400);
        }

        // Check parentRole
        let parentRole = await Role.findOne({name: parentName}).populate({
            path:'sub'
        });
        if (!parentRole) {
            throw new CustomError("Jabatan tidak ditemukan!", 404);
        }

        // Check if the sub-role already exists under the same parent role
        if (parentRole.sub.length !== 0) {
            const subroleExists = parentRole.sub.find(sub => sub.name === subName); // throw error here.. when sub is empty
            if (subroleExists) {
                throw new CustomError("Jabatan sudah ada!", 409);
            }
        }

        let subrole = new Role({
            name: subName,
        });

        subrole = await subrole.save()

        console.log("Am I here??")

        parentRole.sub.push(subrole._id);

        console.log(parentRole)
        console.log("Am I here v2??")

        parentRole = await parentRole.save() // this part make error.. subrole is pushed to parentRole but error while savings?
        
        return {
            statusCode: 201,
            data: {
                role: role,
                subrole: subrole
            }
        }
    }

    buildPopulate = async (role) => {
        // Populate the 'sub' field with 'name' and 'sub'
        role = await Role.populate(role, {
            path: 'sub',
            select: 'name sub'
        });

        // Recursively populate the sub-documents
        for (let i = 0; i < role.sub.length; i++) {
            if (!role.sub[i] || !role.sub[i].sub || role.sub[i].sub.length === 0) {
                continue; // Skip this iteration if there's nothing to populate
            }
            role.sub[i] = await this.buildPopulate(role.sub[i]);
        }

        return role;
    }
    
    getMenu = async () => {
        // Fetch all top-level roles
        let menu = await Role.find({ isTopLevel: true }).select('name sub');

        // Populate sub-roles recursively
        for (let i = 0; i < menu.length; i++) {

            // Check if menu[i] is falsy or if sub is empty, and skip to the next iteration
            if (!menu[i]) {
                console.warn(`Menu item at index ${i} is null or undefined.`);
                continue; // Skip this iteration and go to the next one
            }

            if (!Array.isArray(menu[i].sub) || menu[i].sub.length === 0) {
                console.warn(`Menu item at index ${i} has no sub-roles.`);
                continue; // Skip this iteration if there's nothing to populate
            }

            // Populate the sub if it exists
            try {
                menu[i] = await this.buildPopulate(menu[i]);
            } catch (error) {
                console.error(`Error while populating role at index ${i}:`, error);
            }
        }

        return {
            statusCode: 200,
            data: {
                menu: menu
            }
        };
    };
}

const roleController = new RoleController();

export default roleController;