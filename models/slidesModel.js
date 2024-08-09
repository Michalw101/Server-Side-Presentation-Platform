const mongoose = require('../DB');

const slidesSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    content: String
})

const slidesModel = mongoose.model("presentations", slidesSchema);



async function getSlide(id) {
    try {
        const result = await slidesModel.find({ id: id });
        console.log(result);
        if (!result || result.length == 0)
            throw new Error("cannot find presentation");
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}




module.exports = { getSlide }