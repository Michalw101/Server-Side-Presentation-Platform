const express = require('express');
const router = express.Router();
const model = require('../models/presentationsModel');
const slide_model = require('../models/slidesModel')

//Get a prasentaion by title
router.get('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        res.send(await model.getPresentation(title));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

//Get all presentations
router.get('/', async (req, res) => {
    try {
        res.send(await model.getAllPresentations());
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})


//Create a presentation
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        res.send(await model.createPresentation(req.body));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

//Delete a presentation
router.delete('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        res.send(await model.deleltePresentation(title));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

// Add or update slide to a presentation
router.put('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const { content, authors, slide_id } = req.body;

        // Ensure the presentation exists
        const presentation = await model.getPresentation(title);
        console.log(presentation);

        // Remove slide if specified and exists
        if (slide_id && presentation.slides.includes(slide_id)) {
            await model.removeSlide(title, slide_id);
            return res.send("Slide removed successfully");
        }

        // Update authors list if provided
        if (Array.isArray(authors)) {
            await model.updateAuthors(title, authors);
            return res.send("Authors updated successfully");
        }

        // Add existing slide if slide_id is provided
        if (slide_id && !content) {
            await slide_model.getSlide(slide_id);
            return res.send("Slide added successfully");
        }

        // Add new slide if content is provided
        if (content) {
            const new_slide = await slide_model.createSlide({ content });
            const new_slide_id = new_slide.id;
            await model.addSlide(title, new_slide_id);
            return res.send("New slide added successfully");
        }

        res.status(400).send("Invalid request");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating presentation");
    }
});



module.exports = router;