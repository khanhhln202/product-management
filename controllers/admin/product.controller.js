const Product = require("../../models/product.model")
const DummyProduct = require("../../models/dummy-products");


// [GET] /admin/products
module.exports.index = async (req, res) => {
    const dummyProducts = await DummyProduct.find({
        delete: false
    });

    console.log(dummyProducts);

    res.render("admin/pages/products/index", {
        pageTitle: "Products list",
        dummyProducts: dummyProducts
    });
}