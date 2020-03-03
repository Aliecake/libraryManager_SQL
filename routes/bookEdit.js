const express = require(`express`);
const db = require('../db/index');
const methodOverride = require(`method-override`);

const { Book } = db.models;

const router = express.Router();


router.post(`/book/:id`, (req, res) => {
    res.redirect(`/`)
})

router.delete(`/book/:id`, (req, res) =>{
    const id = req.params.id
    (async () => {

        await db.sequelize.sync({alter: true})
        
        try {

            const bookToDelete = await Book.findByPk(id)
            console.log(`delete initiated`)
            await Book.destroy({
                where: {
                    id: bookToDelete.id
                }
            })
            console.log(`delete finished`)
            

            res.redirect(`/`)
        } catch (err) {
            console.log(err)
        }
    })()
})
module.exports = router;