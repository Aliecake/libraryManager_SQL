const express = require(`express`);
const bodyParser = require('body-parser');
const path = require(`path`);
const mainRoutes = require(`./routes/index`)
const errorRoutes = require(`./routes/errors`)
const editRoutes = require(`./routes/bookEdit`)

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/static`, express.static(path.join(__dirname, `public`)));


app.use(mainRoutes);
app.use(editRoutes);
app.use(errorRoutes);

app.set(`view engine`, `pug`);

app.listen(port, () => {
    console.log(`Weeeeee, I'm listening on port 3000`);
});

module.exports = app;