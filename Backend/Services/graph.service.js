const driver = require("../config/DatabaseConfig");

async function getJobs() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (j:Job)
      RETURN j.name AS name,
             j.description AS description
      ORDER BY j.name
    `);

    return result.records.map((record) => ({
      name: record.get("name"),
      description: record.get("description"),
    }));
  } finally {
    await session.close();
  }
}

async function getJobByName(jobName) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Job {name: $jobName})
      RETURN j.name AS name,
             j.description AS description
      `,
      { jobName }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      name: record.get("name"),
      description: record.get("description"),
    };
  } finally {
    await session.close();
  }
}

async function getJobSkills(jobName) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Job {name: $jobName})
            -[r:REQUIRES]->
            (s:Skill)

      RETURN s.name AS name,
             s.category AS category,
             s.description AS description,
             r.importance AS importance

      ORDER BY
        CASE r.importance
          WHEN "essential" THEN 1
          ELSE 2
        END,
        s.name
      `,
      { jobName }
    );

    return result.records.map((record) => ({
      name: record.get("name"),
      category: record.get("category"),
      description: record.get("description"),
      importance: record.get("importance"),
    }));
  } finally {
    await session.close();
  }
}

async function getSkills() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (s:Skill)
      RETURN s.name AS name,
             s.category AS category,
             s.description AS description
      ORDER BY s.category, s.name
    `);

    return result.records.map((record) => ({
      name: record.get("name"),
      category: record.get("category"),
      description: record.get("description"),
    }));
  } finally {
    await session.close();
  }
}

async function getMissingSkills(jobName, userSkills) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Job {name: $jobName})-[:REQUIRES]->(skill:Skill)

      WHERE NOT skill.name IN $userSkills

      MATCH (j)-[r:REQUIRES]->(skill)

      RETURN skill.name AS name,
             skill.category AS category,
             skill.description AS description,
             r.importance AS importance

      ORDER BY
        CASE r.importance
          WHEN "essential" THEN 1
          ELSE 2
        END,
        skill.name
      `,
      {
        jobName,
        userSkills,
      }
    );

    return result.records.map((record) => ({
      name: record.get("name"),
      category: record.get("category"),
      description: record.get("description"),
      importance: record.get("importance"),
    }));
  } finally {
    await session.close();
  }
}

async function getLearningPaths(jobName, userSkills) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Job {name: $jobName})-[:REQUIRES]->(target:Skill)

      MATCH path =
        (prerequisite:Skill)
        -[:PREREQUISITE_OF*1..3]->
        (target)

      WHERE NOT target.name IN $userSkills
        AND NOT prerequisite.name IN $userSkills

      RETURN
        target.name AS targetSkill,
        [node IN nodes(path) | node.name] AS learningPath

      ORDER BY targetSkill
      `,
      {
        jobName,
        userSkills,
      }
    );

    return result.records.map((record) => ({
      targetSkill: record.get("targetSkill"),
      learningPath: record.get("learningPath"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getJobs,
  getJobByName,
  getJobSkills,
  getSkills,
  getMissingSkills,
  getLearningPaths,
};