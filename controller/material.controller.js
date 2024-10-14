import Material from "../models/material.model.js";
import CustomError from "../utility/customError.js";

class MaterialController {
    /**
     * Update existing materials or create new ones
     * @param {Array} newDataArray - Array of new material data
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) {
            if (!data.material || !data.usage) {
                throw new CustomError("Form tidak lengkap!", 400);
            }

            const newMaterial = new Material({
                material: data.material,
                usage: data.usage
            });

            await newMaterial.save(); // Save the new material
            newArrayID.push(newMaterial._id); // Add new material ID
        }

        return newArrayID; // Return the updated array of IDs
    }

    /**
     * Delete a material
     * @param {String} idToDelete - ID of the material to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const material = await Material.findByIdAndDelete(idToDelete);
        
        if (!material) {
            throw new CustomError('Material tidak ditemukan!', 404);
        }

        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());

        return newArrayID;
    }
}

const materialController = new MaterialController();

export default materialController;
