const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // :status and :id are dynamic params

router.patch("/change-multi", controller.changeMulti); // :status and :id are dynamic params

router.delete("/delete/:id", controller.deleteItem);

module.exports =  router;