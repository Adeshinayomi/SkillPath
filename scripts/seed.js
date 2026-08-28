require("dotenv").config({
  path: "./backend/.env",
});

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

const skills = [
  {
    name: "JavaScript",
    category: "Programming Language",
    description: "A programming language widely used for web development",
  },
  {
    name: "TypeScript",
    category: "Programming Language",
    description: "A typed superset of JavaScript",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "A JavaScript runtime for building server-side applications",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "A web framework for Node.js",
  },
  {
    name: "REST APIs",
    category: "Backend",
    description: "An architectural approach for building web APIs",
  },
  {
    name: "SQL",
    category: "Database",
    description: "A language used to work with relational databases",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "An open-source relational database system",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "A document-oriented NoSQL database",
  },
  {
    name: "Redis",
    category: "Database",
    description: "An in-memory data store commonly used for caching",
  },
  {
    name: "React",
    category: "Frontend",
    description: "A JavaScript library for building user interfaces",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "A React framework for full-stack web applications",
  },
  {
    name: "HTML",
    category: "Frontend",
    description: "The markup language used to structure web pages",
  },
  {
    name: "CSS",
    category: "Frontend",
    description: "A stylesheet language used to style web pages",
  },
  {
    name: "Git",
    category: "Tools",
    description: "A distributed version control system",
  },
  {
    name: "Docker",
    category: "DevOps",
    description: "A platform for containerizing applications",
  },
  {
    name: "Linux",
    category: "Operating System",
    description: "An open-source operating system commonly used on servers",
  },
  {
    name: "AWS",
    category: "Cloud",
    description: "A cloud computing platform",
  },
  {
    name: "CI/CD",
    category: "DevOps",
    description: "Practices for automating software integration and deployment",
  },
];

const jobs = [
  {
    name: "Frontend Developer",
    description: "Builds user interfaces and client-side web applications",
  },
  {
    name: "Backend Developer",
    description: "Builds server-side applications, APIs, and data services",
  },
  {
    name: "Full-Stack Developer",
    description: "Works across frontend and backend application development",
  },
  {
    name: "DevOps Engineer",
    description: "Automates software delivery and manages infrastructure",
  },
  {
    name: "Data Engineer",
    description: "Builds systems for collecting, processing, and managing data",
  },
];

const projects = [
  {
    name: "E-commerce Platform",
    description: "An online shopping platform with products, carts, and orders",
  },
  {
    name: "REST API",
    description: "A backend API for managing application data",
  },
  {
    name: "Task Management App",
    description: "An application for creating and managing tasks",
  },
  {
    name: "Real-time Chat Application",
    description: "An application that allows users to communicate in real time",
  },
  {
    name: "Data Pipeline",
    description: "A system for collecting and transforming data",
  },
];

const jobSkills = [
  {
    job: "Frontend Developer",
    skills: [
      ["HTML", "essential"],
      ["CSS", "essential"],
      ["JavaScript", "essential"],
      ["React", "essential"],
      ["TypeScript", "preferred"],
      ["Git", "essential"],
    ],
  },
  {
    job: "Backend Developer",
    skills: [
      ["JavaScript", "essential"],
      ["Node.js", "essential"],
      ["Express.js", "essential"],
      ["REST APIs", "essential"],
      ["SQL", "essential"],
      ["PostgreSQL", "preferred"],
      ["Redis", "preferred"],
      ["Git", "essential"],
    ],
  },
  {
    job: "Full-Stack Developer",
    skills: [
      ["HTML", "essential"],
      ["CSS", "essential"],
      ["JavaScript", "essential"],
      ["React", "essential"],
      ["Node.js", "essential"],
      ["REST APIs", "essential"],
      ["SQL", "preferred"],
      ["Git", "essential"],
    ],
  },
  {
    job: "DevOps Engineer",
    skills: [
      ["Linux", "essential"],
      ["Git", "essential"],
      ["Docker", "essential"],
      ["AWS", "preferred"],
      ["CI/CD", "essential"],
    ],
  },
  {
    job: "Data Engineer",
    skills: [
      ["Python", "essential"],
      ["SQL", "essential"],
      ["PostgreSQL", "essential"],
      ["AWS", "preferred"],
      ["Linux", "essential"],
    ],
  },
];
const prerequisites = [
  ["JavaScript", "TypeScript"],
  ["JavaScript", "React"],
  ["JavaScript", "Node.js"],
  ["Node.js", "Express.js"],
  ["Node.js", "REST APIs"],
  ["SQL", "PostgreSQL"],
  ["Linux", "Docker"],
  ["Git", "CI/CD"],
  ["Docker", "CI/CD"],
];

const relatedSkills = [
  ["Node.js", "Express.js"],
  ["Node.js", "REST APIs"],
  ["MongoDB", "Node.js"],
  ["PostgreSQL", "SQL"],
  ["Docker", "Linux"],
  ["AWS", "Docker"],
  ["React", "Next.js"],
  ["TypeScript", "React"],
];

const projectSkills = [
  {
    project: "E-commerce Platform",
    skills: ["React", "Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    project: "REST API",
    skills: ["Node.js", "Express.js", "REST APIs", "SQL"],
  },
  {
    project: "Task Management App",
    skills: ["React", "Node.js", "REST APIs", "PostgreSQL"],
  },
  {
    project: "Real-time Chat Application",
    skills: ["React", "Node.js", "Express.js"],
  },
  {
    project: "Data Pipeline",
    skills: ["Python", "SQL", "PostgreSQL", "AWS"],
  },
];

async function seed() {
  const session = driver.session();

  try {
    console.log("Starting database seed...");

    for (const skill of skills) {
      await session.run(
        `
        MERGE (s:Skill {name: $name})
        SET s.category = $category,
            s.description = $description
        `,
        skill
      );
    }

    console.log("Skills seeded");

    for (const job of jobs) {
      await session.run(
        `
        MERGE (j:Job {name: $name})
        SET j.description = $description
        `,
        job
      );
    }

    console.log("Jobs seeded");

    for (const project of projects) {
      await session.run(
        `
        MERGE (p:Project {name: $name})
        SET p.description = $description
        `,
        project
      );
    }

    console.log("Projects seeded");

    for (const job of jobSkills) {
      for (const [skillName, importance] of job.skills) {
        await session.run(
          `
          MATCH (j:Job {name: $jobName})
          MATCH (s:Skill {name: $skillName})
          MERGE (j)-[r:REQUIRES]->(s)
          SET r.importance = $importance
          `,
          {
            jobName: job.job,
            skillName,
            importance,
          }
        );
      }
    }

    console.log("Job-skill relationships created");

    for (const [prerequisite, skill] of prerequisites) {
        await session.run(
            `
            MATCH (a:Skill {name: $prerequisite})
            MATCH (b:Skill {name: $skill})
            MERGE (a)-[:PREREQUISITE_OF]->(b)
            `,
            {
            prerequisite,
            skill,
            }
        );
    }

    console.log("Prerequisite relationships created");

    for (const [skillA, skillB] of relatedSkills) {
    await session.run(
        `
        MATCH (a:Skill {name: $skillA})
        MATCH (b:Skill {name: $skillB})
        MERGE (a)-[:RELATED_TO]->(b)
        `,
        {
        skillA,
        skillB,
        }
    );
    }

    console.log("Related-skill relationships created");

    for (const project of projectSkills) {
    for (const skill of project.skills) {
        await session.run(
        `
        MATCH (s:Skill {name: $skillName})
        MATCH (p:Project {name: $projectName})
        MERGE (s)-[:USED_IN]->(p)
        `,
        {
            skillName: skill,
            projectName: project.project,
        }
        );
    }
    }

    console.log("Project relationships created");


  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();