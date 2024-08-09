const express = require('express');
const router = express.Router();
const model = require('../models/presentationsModel');

router.get('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        res.send(await model.getPresentation(title));
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})

router.get('/', async (req, res) => {
    try {
        res.send(await model.getAllPresentations());
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        res.send(await model.createPresentation(req.body));
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})

router.delete('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        res.send(await model.deleltePresentation(title));
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})

router.put('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const slide_id = req.body.slide_id;
        //makes sure slide exist
        //makes sure presentation exist
        res.send(await model.addSlide(title, slide_id));
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})

module.exports = router;