const express = require(`express`),
    db = require('../db/index'),
    middleware = require(`../middleware`);

const { Book } = db.models;

const router = express.Router();

//-- INDEX --//
router.get(`/`, middleware.asyncHandler(async (req, res) => {
    await db.sequelize.sync({alter: true})

        const books = await Book.findAll({
            order: [[`id`, `ASC`]]
        })
        res.render(`index`, { books })
}));

//-- CREATE ROUTE --//
router.get(`/books/new_book`, (req, res) => {
    res.render(`new`)
});

//-- DETAIL ROUTE --//
router.get(`/books/:id/details`, middleware.asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id)

    res.render(`book_detail`, { book : book.dataValues })
}));


module.exports = router;