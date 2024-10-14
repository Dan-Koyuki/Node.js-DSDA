import Result from "../models/result.model.js";
import CustomError from "../utility/customError.js";

class ResultController {
    /**
     * Update existing result entries or create new ones
     * @param {Array} newDataArray - Array of new result data
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) {
            if (!data.result || !data.resultType) {
                throw new CustomError("Form tidak lengkap!", 400);
            }

            const newResult = new Result({
                result: data.result,
                resultType: data.resultType
            });

            await newResult.save(); // Save the new result
            newArrayID.push(newResult._id); // Add new result ID
        }

        return newArrayID; // Return the updated array of IDs
    }

    /**
     * Delete a result entry
     * @param {String} idToDelete - ID of the result to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const result = await Result.findByIdAndDelete(idToDelete);

        if (!result) {
            throw new CustomError('Result tidak ditemukan!', 404);
        }

        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());

        return newArrayID;
    }
}

const resultController = new ResultController();

export default resultController;
