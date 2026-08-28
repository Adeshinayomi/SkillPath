const { getSkills } = require("../Services/graph.service");

async function getAllSkills(req, res) {
  try {
    const skills = await getSkills();

    res.json({
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      message: "Failed to retrieve skills",
    });
  }
}

module.exports = {
  getAllSkills,
};