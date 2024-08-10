const express = require('express');
const router = express.Router();
const model = require('../models/slidesModel');
const presentations_model = require('../models/presentationsModel')

router.get('/:id', async (req, res) => {
    try {
        const title = req.params.id;
        res.send(await model.getSlide(id));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
        res.send(await model.createSlide(req.body));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        //Find the presentations using the slide
        const presentations = await presentations_model.getPresentationsBySlide(id);
        //Remove slide
        await Promise.all(presentations.map(p => presentations_model.removeSlide(p.title, id)));

        res.send(await model.delelteSlide(id));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = req.body.content;
        res.send(await model.updateSlide(id, content));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})



module.exports = router;