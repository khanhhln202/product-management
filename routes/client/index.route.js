const categoryMiddleware = require("../../middlewares/client/category.middleware");

const homeRoutes = require("./home.route");
const productRoutes = require("./products.route");

module.exports = (app) => {
app.use(categoryMiddleware.categoryMiddleware);

app.get('/', homeRoutes);

app.use('/products', productRoutes);
}