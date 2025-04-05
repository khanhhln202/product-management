const DummyProduct = require("../../models/dummy-products");

const productsHelper = require("../../helpers/products");

// [GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    let newProducts = [];

    if(keyword) {
        const regex = new RegExp(keyword, "i");
        const products = await DummyProduct.find({ 
            title: regex,
            delete: false,
            status: "active",
        });

        newProducts = productsHelper.priceNew(products);
    }

    res.render("client/pages/search/index", {
        pageTitle: "Search Results",
        keyword: keyword,
        dummyProducts: newProducts,
    });
};