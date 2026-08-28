const express = require("express");

const {
  getAllJobs,
  getJob,
} = require("../Controllers/job.controller");

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:jobName", getJob);

module.exports = router;