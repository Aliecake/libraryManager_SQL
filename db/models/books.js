const { Sequelize, Model } = require(`sequelize`);

module.exports = (sequelize) => {
    class Book extends Model {}

    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Title cannot be blank`
                },
                notNull: {
                    msg: `Provide Title Name`
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: `Author name cannot be blank`
                },
                notNull: {
                    msg: `Provide Author Name`
                }
            }
        },
        genre: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        }
    }, {
        sequelize
    })
    return Book;
}