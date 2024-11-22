// Using Node.js `require()`
const express = require('express');

const route = require("./routes/client/index.route")

const app = express();
const port = 3000;

// Express supports templating engines like Pug, EJS, and Handlebars, enabling dynamic content rendering.
app.set('views', './views');
app.set('view engine', 'pug');

// Route
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});