const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");


module.exports = (app) => {

app.get('/', homeRoutes);

app.use('/products', productRoutes);
}