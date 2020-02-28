const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/index`)
const errorRoutes = require(`./routes/errors`)

const app = express();
const port = process.env.PORT || 3001;

app.use(`/static`, express.static(path.join(__dirname, 'public')))


app.use(mainRoutes)
app.use(errorRoutes)

app.set(`view engine`, `pug`)


app.listen(port, () => {
    console.log(`Weeeeee, I'm listening on port 3001`)
});

module.exports = app;