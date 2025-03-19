const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const controller = require('../../controllers/admin/account.controller');
const validate = require('../../validates/admin/account.validates');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), uploadCloud.upload, validate.create_post, controller.create_post);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('avatar'), uploadCloud.upload, validate.edit_patch, controller.edit_patch);

module.exports = router;