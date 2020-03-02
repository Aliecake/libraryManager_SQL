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



router.get(`/`, (req, res) => {
    
    (async () => {
        // await db.sequelize.sync({alter: true})
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

router.get(`/book/:id`, (req, res) => {
    (async () => {
        await db.sequelize.sync({alter: true})
        try {
            const book = await Book.findByPk(req.params.id)
            console.log(book)
            res.render(`book_detail`, { book : book.dataValues })
        } catch(err) {
            console.log(err)
        }
        
    })()
 
});

router.get(`/book/:id/details`, (req, res) => {
    res.send(`book details for ${req.params.id}`)
});

// router.get(`*`, (req, res) => {
//     res.send(`404 not found`)
// });

module.exports = router;