import Correlation from "../models/correlation.model.js";
import CustomError from "../utility/customError.js";

class CorrelationController {
    /**
     * 
     * @param {Array} newDataArray - Array of new data (correlation entries)
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) { // Correct iteration
            const correlation = new Correlation({
                roleName: data.roleName,
                unit: data.unit,
                term: data.term
            });

            await correlation.save(); // Save the new correlation document

            newArrayID.push(correlation._id); // Add the new _id to the array
        }

        return newArrayID; // Return the updated array of IDs
    };

    /**
     * 
     * @param {String} id - ID of the correlation to delete
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array after deletion
     */
    delete = async (idToDelete, oldArrayID) => {
        const correlation = await Correlation.findByIdAndDelete(idToDelete);
        
        if (!correlation) {
            throw new CustomError('Correlation not found', 404);
        }
    
        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());
    
        return newArrayID;
    };
}

const correlationController = new CorrelationController();

export default correlationController;
