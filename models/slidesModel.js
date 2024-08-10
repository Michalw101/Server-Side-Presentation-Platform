const mongoose = require('../DB');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const slidesSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    content: String
})

slidesSchema.plugin(AutoIncrement, { inc_field: 'id' });
const slidesModel = mongoose.model("slides", slidesSchema);



async function getSlide(id) {
    try {
        const result = await slidesModel.find({ id: id });
        console.log(result);
        if (!result || result.length == 0)
            throw new Error("cannot find slide");
        return result[0];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function createSlide(body) {
    try {
        const { id, content } = body;
        console.log(body);
        const result = await slidesModel.create({
            id: id,
            content: content
        });
        console.log("Data saved successfully:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function delelteSlide(id) {
    try {
        const result = await slidesModel.deleteOne({ id: id });
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function updateSlide(id, content) {
    try {
        const result = await slidesModel.updateOne(
            { id: id },
            { content: content }
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}





module.exports = { getSlide, createSlide, delelteSlide, updateSlide }