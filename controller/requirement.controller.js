import Requirement from "../models/requirement.model.js";
import CustomError from "../utility/customError.js";

class RequirementController {
    // Create a new requirement
    create = async (data) => {
        if (!data || !data.skill || !data.ability || !data.temperament || !data.interest || !data.effort || !data.condition) {
            throw new CustomError("Form tidak lengkap!", 400);
        }

        const newRequirement = new Requirement({
            skill: data.skill,
            ability: data.ability,
            temperament: data.temperament,
            interest: data.interest,
            effort: data.effort,
            condition: data.condition
        });

        await newRequirement.save();

        return newRequirement;
    }

    // Update an existing requirement
    update = async ({ data, id }) => {
        if (!id) {
            return await this.create(data);
        }

        let requirementToUpdate = await Requirement.findById(id);

        if (!requirementToUpdate) {
            throw new CustomError("Requirement tidak ditemukan!", 404);
        }

        // Update fields if new data is provided
        requirementToUpdate.skill = data.skill || requirementToUpdate.skill;
        requirementToUpdate.ability = data.ability || requirementToUpdate.ability;
        requirementToUpdate.temperament = data.temperament || requirementToUpdate.temperament;
        requirementToUpdate.interest = data.interest || requirementToUpdate.interest;
        requirementToUpdate.effort = data.effort || requirementToUpdate.effort;
        requirementToUpdate.condition = data.condition || requirementToUpdate.condition;

        await requirementToUpdate.save();

        return requirementToUpdate;
    }
}

const requirementController = new RequirementController();

export default requirementController;
