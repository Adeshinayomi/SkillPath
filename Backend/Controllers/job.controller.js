const {
  getJobs,
  getJobByName,
  getJobSkills,
} = require("../Services/graph.service");

async function getAllJobs(req, res) {
  try {
    const jobs = await getJobs();

    res.json({
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: "Failed to retrieve jobs",
    });
  }
}

async function getJob(req, res) {
  try {
    const { jobName } = req.params;

    const job = await getJobByName(jobName);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const skills = await getJobSkills(jobName);

    res.json({
      ...job,
      skills,
    });
  } catch (error) {
    console.error("Get job error:", error);

    res.status(500).json({
      message: "Failed to retrieve job",
    });
  }
}

module.exports = {
  getAllJobs,
  getJob,
};