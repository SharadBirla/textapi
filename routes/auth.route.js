const express  = require("express");
const { auth } = require("../controllers/auth.controller");
const authController =  require('../controllers/auth.controller');
const router = express.Router();

router.get('/',authController.auth);

module.exports =  router;