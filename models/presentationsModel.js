const mongoose = require('../DB');

const presentationsSchema = new mongoose.Schema({
        title: { type: String, required: true }, 
        authors: [String],
        dateOfPublishment:  { type: Date, required: true }   
})

const presentationModel = mongoose.model("presentations", presentationsSchema);

async function getPresentation(key) {
    try {
       const result = await presentationModel.find({title: key});
       console.log(result);
       return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

module.exports = { getPresentation }