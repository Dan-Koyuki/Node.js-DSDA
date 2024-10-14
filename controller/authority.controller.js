import Authority from "../models/authority.model.js";
import CustomError from "../utility/customError.js";

class AuthorityController {
    /**
     * 
     * @param {Array} newDataArray - Array of new data (authDesc values)
     * @param {Array} oldArrayID - Array of old IDs
     * @returns {Array} - Updated array of IDs
     */
    update = async (newData, oldArrayID) => {
        let newArrayID = [...oldArrayID]; // Copy the old IDs

        for (const data of newData.dataArray) { // Correct iteration
            const authority = new Authority({
                authorDesc: data
            });

            await authority.save(); // Save the new authority document

            newArrayID.push(authority._id); // Add the new _id to the array
        }

        return newArrayID; // Return the updated array of IDs
    };

    /**
     * 
     * @param {String} id - ID of the authority to delete
     * @returns {Array} - Deletion status and message
     */
    delete = async (idToDelete, oldArrayID) => {
        const authority = await Authority.findByIdAndDelete(idToDelete);
        
        if (!authority) {
            throw new CustomError('Authority not found', 404);
        }
    
        // Filter the oldArrayID to exclude the idToDelete
        const newArrayID = oldArrayID.filter(id => id.toString() !== idToDelete.toString());
    
        return newArrayID
    }
    
}

const authorityController = new AuthorityController();

export default authorityController;
