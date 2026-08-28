# SkillPath

### Graph-powered skill gap analysis for career development

SkillPath is a web application that helps users understand the skills required for a target job and identify the skills they are missing.

The application uses **CognoDB**, a managed graph database, to model the relationships between jobs and skills. Users can select a target role, provide their existing skills, and receive a skill-gap analysis based on the relationships stored in the graph.

## Live Demo

**Frontend:** https://skillpath-ruby.vercel.app/

**Backend API:** https://skillpath-b6ft.onrender.com

**Repository:** `<YOUR_GITHUB_REPOSITORY_URL>`

---

## Problem

When preparing for a new role, candidates often have difficulty determining:

* Which skills are required for a particular job
* Which required skills they already possess
* Which skills they are missing
* Which missing skills are more important to prioritize

SkillPath provides a simple way to explore these relationships and identify gaps between a candidate's current skills and the requirements of a target role.

---

## Why a Graph Database?

The core of SkillPath is the relationship between **jobs and skills**.

A relational implementation could represent this using tables such as:

```text
Jobs
Skills
JobSkills
```

This works, but SkillPath's most interesting questions are relationship-oriented.

For example:

> Which skills does this job require that the user does not have?

Or:

> What other jobs are connected to the skills this user already possesses?

These questions naturally involve traversing relationships between entities.

With a graph database, the underlying structure can be represented directly:

```text
(Job)-[:REQUIRES]->(Skill)
```

This makes relationship-based queries more natural to express using Cypher.

The graph model can also be extended without restructuring a collection of join tables. For example, the application could later introduce relationships such as:

```text
(Skill)-[:RELATED_TO]->(Skill)
(Job)-[:SIMILAR_TO]->(Job)
(Skill)-[:BELONGS_TO]->(Category)
```

This makes a graph database a good fit for an application where the connections between entities are central to the problem.

---

# Graph Data Model

The core graph consists of jobs and skills connected through typed relationships.


A job can require multiple skills, while the same skill can be required by multiple jobs.

For example:

```text
Backend Developer
       │
       ├── REQUIRES ──> JavaScript
       ├── REQUIRES ──> Node.js
       ├── REQUIRES ──> Express.js
       └── REQUIRES ──> MongoDB
```

---

# Understanding Graph Hops

A hop represents moving from one node to another through a relationship.

### One-hop traversal

```text
Job
 │
 │ REQUIRES
 ▼
Skill
```

This moves from a `Job` node to a connected `Skill` node.

### Multi-hop traversal

A multi-hop traversal continues through multiple relationships:

```text
Job
 │
 │ REQUIRES
 ▼
Skill
 │
 │ RELATED_TO
 ▼
Another Skill
```

This ability to traverse connected entities is one of the main advantages of using a graph database for relationship-heavy problems.

---

# Core Functionality

SkillPath allows users to:

1. Explore available job roles.
2. Select a target job.
3. Select skills they currently possess.
4. Analyze their skill profile against the requirements of the selected role.
5. Identify skills required by the role that are missing from their current skill set.
6. Explore skills and their relationships within the application.

---

# Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JavaScript
* REST API

### Database

* CognoDB
* openCypher
* Bolt protocol
* Official Neo4j JavaScript driver

### Deployment

* Vercel — Frontend
* Render — Backend
* CognoDB Cloud — Database

---



```

The frontend is deployed independently from the backend.

The frontend communicates with the Express API through HTTP requests. The backend handles application logic and communicates with CognoDB using the official Neo4j JavaScript driver.

---

# Project Structure

```text
SkillPath/
│
├── Backend/
│   ├── Config/
│   ├── Controllers/
│   ├── Routes/
│   ├── Services/
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

### Backend

The backend is responsible for:

* Exposing REST API endpoints
* Processing client requests
* Running graph queries
* Communicating with CognoDB
* Returning structured responses
* Handling application and database errors

The backend separates responsibilities into routes, controllers, services, and configuration.

### Frontend

The frontend is responsible for:

* User interaction
* Job selection
* Skill selection
* Sending requests to the backend
* Displaying skill-gap results
* Providing loading, empty, and error states

---

# Cypher Queries

The application uses parameterized Cypher queries through the official Neo4j JavaScript driver.

## Find a Job

```cypher
MATCH (j:Job {name: $jobName})
RETURN j
```

The job name is passed as a parameter rather than being concatenated directly into the query.

---

## Find Required Skills

```cypher
MATCH (j:Job {name: $jobName})-[:REQUIRES]->(skill:Skill)
RETURN skill
```

This traverses the `REQUIRES` relationship from the selected job to its required skills.

---

## Find Missing Skills

```cypher
MATCH (j:Job {name: $jobName})-[:REQUIRES]->(skill:Skill)
WHERE NOT skill.name IN $userSkills
RETURN skill
```

This query retrieves skills required by the selected job while excluding skills already provided by the user.

---

## Parameterized Queries

User-provided values are passed to the Neo4j driver as parameters.

For example:

```javascript
session.run(query, {
  jobName,
  userSkills
});
```

This avoids constructing Cypher queries through string concatenation and keeps the database layer safer and easier to maintain.

---

# Seed Data

The application uses realistic job and skill data to demonstrate the graph relationships.

The seed data creates the nodes and relationships required for the application and is designed to remain small enough for CognoDB's free-tier resources while still demonstrating meaningful graph queries.

The seed process is included in the repository.

---

# Environment Variables

Sensitive connection information is stored in environment variables and is not committed to the repository.

The backend uses environment variables for the CognoDB connection.

Example:

```env
COGNODB_URI=your_cognodb_connection_uri
COGNODB_PASSWORD=your_cognodb_password
```

The exact variable names should match the backend configuration.

The frontend uses:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, this points to the deployed Render API:

```env
VITE_API_URL=https://skillpath-b6ft.onrender.com/api
```

> Never commit `.env` files or database credentials to the repository.

---

# Local Development

## Prerequisites

* Node.js
* npm
* A CognoDB Cloud instance

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd SkillPath
```

## 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file containing your CognoDB credentials.

```env
COGNODB_URI=your_cognodb_uri
COGNODB_PASSWORD=your_cognodb_password
```

Start the development server:

```bash
npm run dev
```

---

## 3. Frontend setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create the frontend environment file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

---

# CognoDB Setup

1. Create an account on CognoDB Cloud.
2. Create a free database instance.
3. Copy the generated Bolt connection URI.
4. Save the generated password securely.
5. Add the credentials to the backend environment variables.
6. Run the project's seed process to populate the graph.
7. Start the backend and verify the API connection.

CognoDB communicates with the application through the official Neo4j driver using the Bolt protocol and openCypher.

---

# Error Handling

The backend includes error handling for application and database operations.

If the graph database cannot be reached, the API returns an appropriate error response instead of allowing the application to fail silently.

The frontend also provides user-facing loading and error states when API requests cannot be completed.

---

# Deployment

SkillPath is deployed using separate frontend and backend services.

### Frontend

The React/Vite frontend is hosted on Vercel:

**https://skillpath-ruby.vercel.app/**

### Backend

The Express API is hosted on Render:

**https://skillpath-b6ft.onrender.com**

### Database

The application uses a CognoDB Cloud instance as its graph database.

Production database credentials are stored as environment variables on the backend and are not exposed to the frontend.


# Links

**Live Application:**
https://skillpath-ruby.vercel.app/

**Backend API:**
https://skillpath-b6ft.onrender.com

**GitHub Repository:**
`https://github.com/Adeshinayomi/SkillPath`

---

# Author

**ADESHINAYOMI**

GitHub: `https://github.com/Adeshinayomi/`
Email: `adeshinabhadmus5@gmail.com`
