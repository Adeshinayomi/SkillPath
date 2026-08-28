const { getSkills, getSkillDetails } = require("../Services/graph.service");

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

async function getSkill(req, res) {
  try {
    const skill = await getSkillDetails(req.params.skillName);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (error) {
    console.error("Get skill error:", error);
    res.status(500).json({ message: "Failed to retrieve skill" });
  }
}

module.exports = {
  getAllSkills,
  getSkill,
};
