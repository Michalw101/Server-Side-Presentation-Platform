const mongoose = require('../DB');

const presentationsSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, authors: [String],
    dateOfPublishment: { type: Date, default: Date.now },
    slides: [Number]
})

const presentationModel = mongoose.model("presentations", presentationsSchema);



async function getPresentation(title) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.find({ title: title });
        console.log(result);
        if (!result || result.length == 0)
            throw new Error("cannot find presentation");
        return result[0];
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

async function getPresentationsBySlide(slide_id) {
    try {
        const result = await presentationModel.find({slides: slide_id});
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function createPresentation(body) {
    try {
        const { title, authors, slides } = body;
        console.log(body);
        const result = await presentationModel.create({
            title: title,
            authors: authors,
            slides: slides
        });
        console.log("Data saved successfully:", result);
        return result;
    } catch (error) {
        if (error.code === 11000)
            console.error('Title already exists');
        else {
            console.error("Error:", error);
        }
        throw error;
    }
}

async function deleltePresentation(title) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.deleteOne({ title: title });
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

async function removeSlide(title, slide_id) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.updateOne(
            { title: title },
            { $pull: { slides: slide_id } }
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function updateAuthors(title, authors) {
    try {
        title = title.replace(/^"|"$/g, '');
        const result = await presentationModel.updateOne(
            { title: title },
            { authors: authors }
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


module.exports = { getPresentation, createPresentation, getAllPresentations, getPresentationsBySlide, deleltePresentation, addSlide,removeSlide, updateAuthors }