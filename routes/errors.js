const express = require(`express`),
    router = express.Router();


router.use((err, req, res, next) => {
    err.status = 500;
    next(err);
});

router.get(`*`, (req, res) => {
    res.render(`page-not-found`);
});



module.exports = router;