import Set from "../models/set.model.js";
import CustomError from "../utility/customError.js";

class SetController {
    /**
     * Update existing set entries or create new ones
     * @param {Array} newDataArray - Array of new set data
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) {
            if (!data.setName || !data.usage) {
                throw new CustomError("Form tidak lengkap!", 400);
            }

            const newSet = new Set({
                setName: data.setName,
                usage: data.usage
            });

            await newSet.save(); // Save the new set
            newArrayID.push(newSet._id); // Add new set ID
        }

        return newArrayID; // Return the updated array of IDs
    }

    /**
     * Delete a set entry
     * @param {String} idToDelete - ID of the set to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const set = await Set.findByIdAndDelete(idToDelete);

        if (!set) {
            throw new CustomError('Set tidak ditemukan!', 404);
        }

        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());

        return newArrayID;
    }
}

const setController = new SetController();

export default setController;
