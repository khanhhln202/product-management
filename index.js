// Using Node.js `require()`
const express = require('express');

// Method Override (Express doesn't support PUT, PATCH, DELETE in HTML forms. To solve this, we can use the method-override package.)
const methodOverride = require('method-override');

// Body Parser (Express doesn't support parsing the request body by default. To solve this, we can use the body-parser package.)
const bodyParser = require('body-parser');

// Configure env 
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(methodOverride('_method'));

// Parse application/json
app.use(bodyParser.json()); 
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Express supports templating engines like Pug, EJS, and Handlebars, enabling dynamic content rendering.
app.set('views', './views');
app.set('view engine', 'pug');

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Serving Static Files (Express allows serving static assets (HTML, CSS, images) easily.)
app.use(express.static('public'));

// Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}); 