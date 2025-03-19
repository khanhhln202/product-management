const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validates");

router.get("/login", controller.login);

router.post("/login", validate.login_post, controller.login_post);

module.exports = router;