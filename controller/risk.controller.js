import Risk from "../models/risk.model.js";
import CustomError from "../utility/customError.js";

class RiskController {
    /**
     * Update existing risk entries or create new ones
     * @param {Array} newDataArray - Array of new risk data
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) {
            if (!data.riskName || !data.reason) {
                throw new CustomError("Form tidak lengkap!", 400);
            }

            const newRisk = new Risk({
                riskName: data.riskName,
                reason: data.reason
            });

            await newRisk.save(); // Save the new risk
            newArrayID.push(newRisk._id); // Add new risk ID
        }

        return newArrayID; // Return the updated array of IDs
    }

    /**
     * Delete a risk entry
     * @param {String} idToDelete - ID of the risk to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const risk = await Risk.findByIdAndDelete(idToDelete);

        if (!risk) {
            throw new CustomError('Risk tidak ditemukan!', 404);
        }

        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());

        return newArrayID;
    }
}

const riskController = new RiskController();

export default riskController;
