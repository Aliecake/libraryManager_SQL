const express = require(`express`);

const router = express.Router();


router.get(`/`, (req, res) => {
    res.render(`index`)
});

router.get(`/book/:id`, (req, res) => {
    res.send(`book ${req.params.id}`)
});

router.get(`/book/:id/details`, (req, res) => {
    res.send(`book details for ${req.params.id}`)
});

// router.get(`*`, (req, res) => {
//     res.send(`404 not found`)
// });

module.exports = router;