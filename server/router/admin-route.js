const express = require("express");
const AdminController = require("../controllers/admin-controller");
const router = express.Router();


router.route("/users").get(AdminController.getAllUsers);
router.route("/contact").get(AdminController.getAllContact);
module.exports = router