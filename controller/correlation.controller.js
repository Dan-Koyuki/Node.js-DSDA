import Correlation from "../models/correlation.model";

class CorrelationController {
    create = async ({roleName, unit, term}) => {
        if (!roleName || !unit || !term) {
            throw new CustomError ("Data tidak lengkap!", 400);
        }

        const correlation = new Correlation({
            roleName: roleName,
            unit: unit,
            term: term
        });

        await correlation.save()

        return correlation;
    }

    update = async ({data, id}) => {
        if (!id) {
            return await this.create(data);
        } else {
            let correlation = await Correlation.findById(id);
            if (!correlation) {
                throw new CustomError ("Form Tidak Ditemukan", 404)
            }

            correlation.roleName = data.roleName;
            correlation.unit = data.unit;
            correlation.term = data.term;

            await correlation.save();

            return correlation;
        }
    }
}

const correlationController = new CorrelationController();

export correlationController