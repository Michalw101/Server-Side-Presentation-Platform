const express = require('express');
const router = express.Router();
const model = require('../models/presentationsModel');

router.get('/:title', async (req, res) => {
    try {
        const title = req.params.title;
        console.log(title);
        res.send(await model.getPresentation(title));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})


module.exports = router;