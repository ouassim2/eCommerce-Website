"use strict";
const { MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI_TORONTO} = process.env;

const options = {
    useNewUrlparser: true,
    useUnifiedTopology:true,
}

// returns all companies
const getCompanies = async(req, res) => {
    
    // creates a new client
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    // connect to the client
    await client.connect();

    // connect to  database
    const db = client.db("group-project");
    console.log("connected");

    // connect to database companies' collection find & return all companies
    const companies = await db.collection("companies").find().toArray();
    
    companies
    ? res.status(200).json({status: 200, data: companies,  message: "success"})
    : res.status(404).json({status: 404, data: req.body, message: "data sent to server"})   
    }
    catch (err){
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

// get single company based on company id
const getCompany = async(req, res) => {
    // get id from params entered in Frontend
    // the id is a string use parseInt to convert it to a integer
    const id = parseInt(req.params.companyId)
    
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    
    await client.connect();

    const db = client.db("group-project");
    console.log("connected");

    // find & return the company with the specified _id
    const company = await db.collection("companies").findOne({_id:id});      
    company
    ? res.status(200).json({status: 200, data: company,  message: "success"})
    : res.status(404).json({status: 404, data: req.params.companyId, message: "data sent to server"})   
    }
    catch (err){
        console.log(err.stack);
    }
    
    client.close();
    console.log("disconnected!");
};

// update single company based on company id
const updateCompany = async(req, res) => {
    // get id from params entered in Frontend
    const _id = parseInt(req.params.companyId);

    const queryId = {_id}
    
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    
        await client.connect();

        const db = client.db("group-project");
        console.log("connected");

        // if no id return error
        if(_id === undefined) {
            res.status(404).json({ status: 404, data: req.body, message:"data sent to server" })
            }
        
        if(_id){
            // set new values
            const newValue = {$set: {...req.body}}
            // update values of the selected company
            await db.collection("companies").updateOne(queryId, newValue)
            res.status(201).json({status: 201, data: newValue,  message: "success"})  
        }        
    }
    catch (err){
        console.log(err.stack)
    }
    
    client.close();
    console.log("disconnected!")
};

module.exports = {
    getCompanies,
    getCompany,
    updateCompany
};
