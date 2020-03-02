const express = require(`express`);
const router = express.Router();


router.use((err, req, res, next) => {
    err.status = 500;
    next(err);
});

router.get(`*`, (req, res) => {
    res.render(`404`)
});

module.exports = router;