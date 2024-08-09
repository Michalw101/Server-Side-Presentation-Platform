const express = require('express');
const router = express.Router();
const model = require('../models/slidesModel');

router.get('/:id', async (req, res) => {
    try {
        const title = req.params.id;
        res.send(await model.getSlide(id));
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false });
    }
})


module.exports = router;