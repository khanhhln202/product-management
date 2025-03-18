const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/role.controller');

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.create_post);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.edit_patch);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissions_patch);

router.delete("/delete/:id", controller.deleteRole);


module.exports = router;