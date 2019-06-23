const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const itemController = require("../controllers/itemController");

router.get("/items", itemController.index);

router.post("/items/create", validation.validateItems, itemController.create);

module.exports = router;
