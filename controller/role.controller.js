import Role from "../models/role.model.js";
import CustomError from "../utility/customError.js"
import authorityController from "./authority.controller.js";
import classController from "./class.controller.js";
import correlationController from "./correlation.controller.js";
import dataController from "./data.controller.js";
import hopeController from "./hope.controller.js";
import jobController from "./job.controller.js";
import materialController from "./material.controller.js";
import requirementController from "./requirement.controller.js";
import responsibilityController from "./responsibility.controller.js";
import resultController from "./result.controller.js";
import riskController from "./risk.controller.js";
import setController from "./set.controller.js";

class RoleController {
    /**
     * create a new Jabatan in Sidebar Menu
     * @param {name} Nama Jabatan
     * @returns 
     */
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
    
    /**
     * 
     * @param {parentName} Nama Jabatan yang bertindak sebagai atasan
     * @param {subName} Nama Jabatan yang akan di tambahkan dibawah Jabatan Atasan
     * @returns 
     */
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

    editRole = async ({id, updateInfo, actionKey}) => {

        /**
         * updateInfo = {
         *  data: <array of object> || <object> OR <id> if actionKey === 'delete'
         *  key: <string> (one field of updateRoute)
         *  name: <string> (one field in role object)
         * }
         * actionKey = <string> ('delete' or 'update)
         */

        /**
         * example of updateInfo object for array field
         * updateInfo = {
         *  data: {
         *      dataArray: [
         *                      {obj1}, {obj2}
         *                  ]
         *  },
         *  key: 'AU,
         *  name: 'authority'
         * }
         */

        /**
         * example of updateInfo object for non-array field
         * updateInfo = {
         *  data: {
         *      jobName: 'author'
         *  },
         *  key: 'CL,
         *  name: 'class'
         * }
         */

        let role = await Role.findById(id);
        if (!role) {
            throw new CustomError("Jabatan tidak ditemukan!", 404);  // Better to throw an error if the role doesn't exist
        }
    
        const updateRoute = {
            AU: authorityController.update,   // function to update Authority - Array
            CL: classController.update,   // function to update Class
            CR: correlationController.update,   // function to update Correlation - Array
            DT: dataController.update,   // function to update Data
            HO: hopeController.update,   // function to update Hope
            JB: jobController.update,   // function to update Job
            MT: materialController.update,   // function to update Material - Array
            RE: requirementController.update,   // function to update Requirement
            RS: responsibilityController.update,   // function to update Responsibility - Array
            RT: resultController.update,   // function to update Result - Array
            RK: riskController.update,   // function to update Risk - Array
            ST: setController.update,   // function to update Set - Array
        };

        const deleteRoute = {
            AU: authorityController.delete,   // function to delete Authority - Array
            CR: correlationController.delete,   // function to delete Correlation - Array
            MT: materialController.delete,   // function to delete Material - Array
            RS: responsibilityController.delete,   // function to delete Responsibility - Array
            RT: resultController.delete,   // function to delete Result - Array
            RK: riskController.delete,   // function to delete Risk - Array
            ST: setController.delete,   // function to delete Set - Array
        }

        let result;
        const fieldInfo = role[updateInfo.name];
    
        if (actionKey === 'update') {
            const updateFunction = updateRoute[updateInfo.key];
            if (updateFunction) {
                result = await updateFunction(updateInfo.data, fieldInfo);  // Pass correct params
            } else {
                throw new CustomError("Invalid update key!", 400);
            }
        } else if (actionKey === 'delete') {
            const deleteFunction = deleteRoute[updateInfo.key];
            if (deleteFunction) {
                result = await deleteFunction(updateInfo.data, fieldInfo);
            } else {
                throw new CustomError("Invalid delete key!", 400);
            }
        } else {
            throw new CustomError("invalid action key!", 400)
        }
    
        role[updateInfo.name] = result;  // Update the specific field with the result
    
        await role.save();  // Save the updated role
    
        return {
            statusCode: 200,
            data: {
                message: "Update Complete!",
                role: role
            }
        };
    };

    /**
     * 
     * @param {role} Jabatan yang sub Jabatannya akan di isi
     * @returns 
     */
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
    
    /**
     * 
     * @returns Semua top-level Jabatan sebagai menu utama
     */
    getTopLevelMenu = async () => {
        let menu = await Role.find({ isTopLevel: true }).select('name sub'); // No population here
        
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