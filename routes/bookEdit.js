const express = require(`express`),
    db = require('../db/index'),
    methodOverride = require(`method-override`),
    middleware = require(`../middleware`);


const { Book } = db.models;

//merge params to pull in req.params
const router = express.Router({ mergeParams: true });


//-- NEW ROUTE --//
router.post(`/books/new`, middleware.asyncHandler(async (req, res) => {

        await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year
        })

    res.redirect(`/`)
}))

//-- EDIT ROUTE --//
router.put(`/books/:id`, middleware.asyncHandler(async (req, res) => {
    const id = req.params.id;

    const update = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year //string
    }
    //FIND BY ID AND UPDATE ENTRY
    const bookToUpdate = await Book.findByPk(id)

    await bookToUpdate.update({
        title: update.title,
        author: update.author,
        genre: update.genre,
        year: parseInt(update.year)
    })

    res.redirect(`/books/${id}/details`)
}))

//-- DELETE ROUTE --//
router.delete(`/books/:id`, middleware.asyncHandler(async (req, res) =>{
    const id = req.params.id;

    //FIND BY ID AND DELETE ENTRY
    const bookToDelete = await Book.findByPk(id)

    await Book.destroy({
        where: {
            id: bookToDelete.id
        }
    });

    res.redirect(`/`)

}))

module.exports = router;