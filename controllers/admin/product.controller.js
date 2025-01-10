const Product = require("../../models/product.model")
const DummyProduct = require("../../models/dummy-products");


// [GET] /admin/products
module.exports.index = async (req, res) => {
    // AD easy to add more
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ];

    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    let find = {
        delete: false
    }

    if(req.query.status){
        find.status = req.query.status;
    }

    const dummyProducts = await DummyProduct.find(find);

    // console.log(dummyProducts);

    res.render("admin/pages/products/index", {
        pageTitle: "Products list",
        dummyProducts: dummyProducts,
        filterStatus: filterStatus
    });
}