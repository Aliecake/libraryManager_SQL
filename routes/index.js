const express = require(`express`),
    db = require('../db/index'),
    middleware = require(`../middleware`);

const { Book } = db.models;

const router = express.Router();

//-- INDEX --//
router.get(`/`, (req, res) => {
        res.redirect(`/books`)
});

//-- SHOW ROUTE --//
router.get(`/books`, middleware.asyncHandler(async (req, res) => {
    await db.sequelize.sync({alter: true})

        const books = await Book.findAll({
            order: [[`id`, `ASC`]]
        })
        res.render(`index`, { books })
}));


//-- CREATE ROUTE --//
router.get(`/books/new`, (req, res) => {
    res.render(`new-book`)
});

//-- DETAIL ROUTE --//
router.get(`/books/:id`, middleware.asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id)
    if(book) {
        res.render(`update-book`, { book : book })
    } else {
        let errors = new Error(`That book doesn't exist`);
        res.render(`update-book`, { errors });
    }
}));


module.exports = router;