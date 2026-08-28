const express = require("express");
const cors = require("cors");
const app = express();
const dotenv=require("dotenv")
dotenv.config()

const jobRoutes = require("./Routes/job.route");
const skillRoutes = require("./Routes/skill.route");
const analysisRoutes = require("./Routes/analysis.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SkillPath API is running",
  });
});

app.use("/api/jobs", jobRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/analyze", analysisRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});