const express = require(`express`);
const db = require('../db/index')

const { Book } = db.models;

const router = express.Router();

//-- INDEX --//
router.get(`/`, async (req, res) => {
    await db.sequelize.sync({alter: true})
        try {

            const books = await Book.findAll({
                order: [[`id`, `ASC`]]
            })
            res.render(`index`, { books })
        } catch(err) {
            res.render(`error`, { err })
        }

});

//-- CREATE ROUTE --//
router.get(`/books/new_book`, (req, res) => {
    res.render(`new`)
})

//-- DETAIL ROUTE --//
router.get(`/books/:id/details`, async (req, res) => {

        try {
            const book = await Book.findByPk(req.params.id)

            res.render(`book_detail`, { book : book.dataValues })

        } catch(err) {
            res.render(`error`, { err })
        }

});



module.exports = router;