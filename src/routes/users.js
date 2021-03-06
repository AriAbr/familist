const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
validation = require("./validation");

router.get("/users/create_account", userController.createAccountForm);

router.post("/users", validation.validateUsers, userController.create);

router.get("/users/sign_in", userController.signInForm);

router.post("/users/sign_in", validation.validateSignIn, userController.signIn);

router.get("/users/sign_out", userController.signOut);

module.exports = router;
