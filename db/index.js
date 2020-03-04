const Sequelize = require(`sequelize`);

const sequelize = new Sequelize({

    dialect: `sqlite`,
    storage: `library.db`,
    logging: false
});

const db = {
    sequelize,
    Sequelize,
    models: {}
};

//TEST DB connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection to DB working`)
      } catch (error) {
        console.log(`Connection to DB failed`)
      }
})();

db.models.Book = require(`./models/books`)(sequelize);

module.exports = db;