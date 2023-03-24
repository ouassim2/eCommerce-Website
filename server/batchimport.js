// Importing the data from the data folder to be exported to DB
const companiesDataArray = require("./data/companies.json");
const itemsDataArray = require("./data/items.json");

// MongoDB client setup
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI_TORONTO } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportCompanies = async () => {
  // Create client
  const client = new MongoClient(MONGO_URI_TORONTO, options);
  try {
    // Connect to database
    await client.connect();
    console.log("connected");
    const db = client.db("group-project");
    // Adding companies data array to the companies collection
    const result = await db
      .collection("companies")
      .insertMany(companiesDataArray);
  } catch (err) {
    console.log("Error", err);
  } finally {
    // Closing the db connection
    client.close();
    console.log("disconnected");
  }
};

const batchImportItems = async () => {
  // Create client
  const client = new MongoClient(MONGO_URI_TORONTO, options);
  try {
    // Connect to database
    await client.connect();
    console.log("connected");
    const db = client.db("group-project");
    // Adding items data array to the  items collection
    const result = await db.collection("items").insertMany(itemsDataArray);
  } catch (err) {
    console.log("Error");
  } finally {
    // Closing the DB connection
    client.close();
    console.log("disconnected");
  }
};

// Note: I commented these out so we don't run them by accident and overwrite our data in the DB
// We can use this if the data gets corrupted and we need to reset the DB.

// batchImportCompanies();
// batchImportItems();
