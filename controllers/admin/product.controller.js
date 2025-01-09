module.exports.index = (req, res) => {
    res.render("admin/pages/products/index", {
        pagetTitle: "Products list"
    });
}