const express = require("express");

const {
  analyzeSkills,
} = require("../Controllers/analysis.controller");

const router = express.Router();

router.post("/", analyzeSkills);

module.exports = router;