// Initiate the Express application and configure it to use the necessary middleware and routes.
const express = require("express");


// Method Override (Express doesn't support PUT, PATCH, DELETE in HTML forms. To solve this, we can use the method-override package.)
const methodOverride = require("method-override"); // method-override is a middleware that allows us to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

// Body Parser (Express doesn't support parsing the request body by default. To solve this, we can use the body-parser package.)
const bodyParser = require("body-parser"); // body-parser is a middleware that parses the request body and makes it available under req.body.

// Cookie Parser (Express doesn't support parsing cookies by default. To solve this, we can use the cookie-parser package.)
const cookieParser = require('cookie-parser'); // cookie-parser is a middleware that parses cookies attached to the client request object.

// Express Session (Express doesn't support sessions by default. To solve this, we can use the express-session package.)
const session = require('express-session'); // express-session is a middleware that creates a session object in the request object.

// Express Flash (Express doesn't support flash messages by default. To solve this, we can use the express-flash package.)
const flash = require("express-flash"); // flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.

// Configure env (dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.)
require("dotenv").config(); // dotenv is a module that loads environment variables from a .env file into process.env.

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

// Middleware (Express middleware is a function that has access to the request and response objects.)
app.use(methodOverride("_method"));

// Parse application/json (Express doesn't support parsing JSON by default. To solve this, we can use the body-parser package.)
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded (Express doesn't support parsing form data by default. To solve this, we can use the body-parser package.)
app.use(bodyParser.urlencoded({ extended: false }));

// Express supports templating engines like Pug, EJS, and Handlebars, enabling dynamic content rendering.
app.set("views", "./views");
app.set("view engine", "pug");

// Flash
// Use the cookie parser middleware
app.use(cookieParser("keyboard cat")); // This is a secret key used to sign the session ID cookie.
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }})) // This is the session middleware. 60000 is the session duration in milliseconds.
// Use the flash middleware
app.use(flash());
// End of Flash

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Serving Static Files (Express allows serving static assets (HTML, CSS, images) easily.)
app.use(express.static("public"));

// Routes (Express allows defining routes to handle different HTTP methods and URLs.)
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
