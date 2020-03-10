const express = require(`express`),
    db = require('../db/index'),
    methodOverride = require(`method-override`),
    middleware = require(`../middleware`);


const { Book } = db.models;

//merge params to pull in req.params
const router = express.Router({ mergeParams: true });

//-- NEW ROUTE --//
router.post(`/books/new`, middleware.asyncHandler(async (req, res) => {
    let book;
    //try/catch - if no validation errors will create book or show errors
    try{
        book = await Book.create(req.body)
        res.redirect(`/`)

    } catch(err) {
        if(err.name === `SequelizeValidationError`){
            book = Book.build(req.body)
            res.render(`new_book`, {book, errors: err.errors})
        } else {
            throw err
        }
    }

}))

//-- EDIT ROUTE --//
router.put(`/books/:id`, middleware.asyncHandler(async (req, res) => {
    const id = req.params.id;
    let bookToUpdate;

    try {
         //FIND BY ID AND UPDATE ENTRY
        bookToUpdate = await Book.findByPk(id)

        if(bookToUpdate) {
            await bookToUpdate.update(req.body)
            res.redirect(`/books/${id}/details`)
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        if(err.name === `SequelizeValidationError`){
            bookToUpdate = await Book.build(req.body)
            res.render(`update_book`, {book: bookToUpdate, errors: err.errors})
        } else {
            throw err
        }
    }

}))

//-- DELETE ROUTE --//
router.delete(`/books/:id`, middleware.asyncHandler(async (req, res) =>{
    const id = req.params.id;

    //FIND BY ID AND DELETE ENTRY
    const bookToDelete = await Book.findByPk(id)
    if(bookToDelete) {
        await Book.destroy({
            where: {
                id: bookToDelete.id
            }
        });
        res.redirect(`/`)
    } else {
        res.sendStatus(404)
    }
}))

module.exports = router;