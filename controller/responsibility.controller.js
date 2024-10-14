import Responsibility from "../models/responsibility.model.js";
import CustomError from "../utility/customError.js";

class ResponsibilityController {
    /**
     * Update existing responsibilities or create new ones
     * @param {Array} newDataArray - Array of new responsibility data
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) {
            if (!data.desc) {
                throw new CustomError("Form tidak lengkap!", 400);
            }

            const newResponsibility = new Responsibility({
                desc: data.desc
            });

            await newResponsibility.save(); // Save the new responsibility
            newArrayID.push(newResponsibility._id); // Add new responsibility ID
        }

        return newArrayID; // Return the updated array of IDs
    }

    /**
     * Delete a responsibility
     * @param {String} idToDelete - ID of the responsibility to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const responsibility = await Responsibility.findByIdAndDelete(idToDelete);

        if (!responsibility) {
            throw new CustomError('Responsibility tidak ditemukan!', 404);
        }

        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());

        return newArrayID;
    }
}

const responsibilityController = new ResponsibilityController();

export default responsibilityController;
