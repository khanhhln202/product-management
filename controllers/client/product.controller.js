const DummyProduct = require("../../models/dummy-products");
const Product = require("../../models/dummy-products")

// [GET] /products

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const dummyProducts = await DummyProduct.find({
        status: "active",
        delete: false
    }).sort({position: "desc"});

    const newProduct = dummyProducts.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })

    console.log(newProduct);

    res.render("client/pages/products/index", {
        pageTitle: "Products page",
        products: products,
        dummyProducts: newProduct
    });

}