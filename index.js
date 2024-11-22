// Using Node.js `require()`
const express = require('express');

// Configure env 
require("dotenv").config();

const route = require("./routes/client/index.route")

const app = express();
const port = process.env.PORT;

// Express supports templating engines like Pug, EJS, and Handlebars, enabling dynamic content rendering.
app.set('views', './views');
app.set('view engine', 'pug');

// Serving Static Files (Express allows serving static assets (HTML, CSS, images) easily.)
app.use(express.static('public'));

// Routes
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});