const express = require("express");

const {
  getAllSkills,
} = require("../Controllers/skill.controller");

const router = express.Router();

router.get("/", getAllSkills);

module.exports = router;