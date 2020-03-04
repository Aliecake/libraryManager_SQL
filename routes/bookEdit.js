const express = require(`express`);
const db = require('../db/index');
const methodOverride = require(`method-override`);


const { Book } = db.models;

//merge params to pull in req.params
const router = express.Router({ mergeParams: true });


//-- NEW ROUTE --//
router.post(`/books/new`, (req, res) => {
    (async () => {
        try {
            await Book.create({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                year: req.body.year
            })
        } catch(err) {
            console.log(err)
        }
    })()
    res.redirect(`/`)
})

//-- EDIT ROUTE --//
router.put(`/books/:id`, (req, res) => {
    const id = req.params.id;


    (async () => {

        try {
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

        } catch(err) {
            console.log(`Error updating book`, err)
        }
        res.redirect(`/books/${id}/details`)
    })()

})

//-- DELETE ROUTE --//
router.delete(`/books/:id`, (req, res) =>{
    const id = req.params.id;

    (async () => {

        try {
            //FIND BY ID AND DELETE ENTRY
            const bookToDelete = await Book.findByPk(id)

            await Book.destroy({
                where: {
                    id: bookToDelete.id
                }
            });

            res.redirect(`/`)

        } catch (err) {
            console.log(err)
        }
    })();
});

module.exports = router;