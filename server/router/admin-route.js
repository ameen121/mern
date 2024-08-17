const express = require("express");
const AdminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const AdminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware,AdminMiddleware,AdminController.getAllUsers);
router.route("/users/:id").get(authMiddleware,AdminMiddleware,AdminController.getUserByID);
router.route("/users/update/:id").get(authMiddleware,AdminMiddleware,AdminController.updateUserByID);
router.route("/user/delete/:id").delete(authMiddleware,AdminMiddleware,AdminController.deleteUserByID);
router.route("/contacts").get(authMiddleware,AdminMiddleware,AdminController.getAllContact);
router.route("/contacts/delete/:id").delete(authMiddleware,AdminMiddleware,AdminController.deleteContactByID);
module.exports = router