const express = require("express");
const AdminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const AdminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware,AdminMiddleware,AdminController.getAllUsers);
router.route("/contact").get(authMiddleware,AdminMiddleware,AdminController.getAllContact);
module.exports = router