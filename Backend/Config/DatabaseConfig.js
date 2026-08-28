require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD    
  )
);

async function testDatabaseConnection() {
  try {
    await driver.verifyConnectivity();
    console.log("CognoDB connected successfully!");
  } catch (error) {
    console.error("CognoDB connection failed:", error.message);
  }
}

testDatabaseConnection();

module.exports = driver;