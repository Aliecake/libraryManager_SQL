const express = require(`express`),
    router = express.Router();


router.use((err, req, res, next) => {
    err.status = 500;
    next(err);
});

app.get(`*`, (req, res) => {
    res.render(`page_not_found`);
});



module.exports = router;