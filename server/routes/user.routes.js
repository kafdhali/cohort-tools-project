const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../Models/user.model");

router.get("/users/:userId"),
  isAuthenticated,
  (req, res) => {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(404).json({ message: "User not found" });
      });
  };

module.exports = router;
