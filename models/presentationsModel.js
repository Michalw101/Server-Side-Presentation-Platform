const mongoose = require('../DB');

const presentationsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [String],
    dateOfPublishment: Date,
    slides: [Number]
})

const presentationModel = mongoose.model("presentations", presentationsSchema);



async function getPresentation(title) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.find({ title: title });
        console.log(result);
        if (result.length == 0)
            throw new Error("cannot find presentation");
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function getAllPresentations() {
    try {
        const result = await presentationModel.find();
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function createPresentation(body) {
    try {
        const { title, authors, dateOfPublishment, slides } = body;
        console.log(body);
        const result = await presentationModel.create({
            title: title,
            authors: authors,
            dateOfPublishment: dateOfPublishment,
            slides: slides
        });
        console.log("Data saved successfully:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function deleltePresentation(key) {
    try {
        key = key.replace(/^"|"$/g, '');
        const result = await presentationModel.deleteOne({ title: key });
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function addSlide(title, slide_id) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.updateOne(
            { title: title },
            { $push: { slides: slide_id } }
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}



module.exports = { getPresentation, createPresentation, getAllPresentations, deleltePresentation, addSlide }