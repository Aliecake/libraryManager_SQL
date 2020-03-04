const express = require(`express`);
const db = require('../db/index')

const { Book } = db.models;

const router = express.Router();

//TEST DB connection
(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});


//-- INDEX --//
router.get(`/`, (req, res) => {
    (async () => {
        await db.sequelize.sync({alter: true})
        try {
            const books = await Book.findAll({
                order: [[`id`, `ASC`]]
            })
            res.render(`index`, { books })
        } catch(err) {
            console.log(err)
        }
    })()

});

//-- CREATE ROUTE --//
router.get(`/books/new_book`, (req, res) => {
    res.render(`new`)
})

//-- DETAIL ROUTE --//
router.get(`/books/:id/details`, (req, res) => {
    (async () => {
        await db.sequelize.sync({alter: true})
        try {
            const book = await Book.findByPk(req.params.id)

            res.render(`book_detail`, { book : book.dataValues })

        } catch(err) {
            console.log(err)
        }
    })()
});



module.exports = router;