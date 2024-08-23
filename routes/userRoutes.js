const express = require("express");
const redisClient = require("../config/redisClient"); // Assuming you have a redisClient configuration
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers(redisClient));
router.post("/", userController.createUser(redisClient));
router.get("/:id", userController.getUser(redisClient));
router.put("/:id", userController.updateUser(redisClient));
router.delete("/:id", userController.deleteUser(redisClient));

module.exports = router;