const {
  getMissingSkills,
  getLearningPaths,
} = require("../Services/graph.service");

async function analyzeSkills(req, res) {
  try {
    const { job, skills } = req.body;

    if (!job || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Job and skills are required",
      });
    }

    const missingSkills = await getMissingSkills(job, skills);

    const learningPaths = await getLearningPaths(job, skills);

    res.json({
      job,
      currentSkills: skills,
      missingSkills,
      learningPaths,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      message: "Failed to analyze skills",
    });
  }
}

module.exports = {
  analyzeSkills,
};