const express = require(`express`);
const db = require('../db/index');
const methodOverride = require(`method-override`);


const { Book } = db.models;

//merge params to pull in req.params
const router = express.Router({mergeParams: true});


router.post(`/book/:id`, (req, res) => {
    console.log(`post route`)
    // res.redirect(`/`)
})

//-- EDIT ROUTE --//

router.put(`/book/:id`, (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    // (async () => {
    //     const bookToUpdate = await Book.findByPk(id)
    //     console.log(req)
    // })()

})

//-- DELETE ROUTE --//
router.delete(`/book/:id`, (req, res) =>{
    const id = req.params.id;

    (async () => {

        try {

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