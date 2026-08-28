const express = require("express");

const {
  getAllSkills,
  getSkill,
} = require("../Controllers/skill.controller");

const router = express.Router();

router.get("/", getAllSkills);
router.get("/:skillName", getSkill);

module.exports = router;
