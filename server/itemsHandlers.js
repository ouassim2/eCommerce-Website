"use strict";
const { MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI_TORONTO} = process.env;

const options = {
    useNewUrlparser: true,
    useUnifiedTopology:true,
}

// returns all product items
const getAllItems = async(req, res) => {
    
    // creates a new client
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    // connect to the client
    await client.connect();

    // connect to  database
    const db = client.db("group-project");
    console.log("connected");

    // connect to database items' collection find & return all product items
    const items = await db.collection("items").find().toArray();

    items
    ? res.status(200).json({status: 200, data: items,  message: "success"})
    : res.status(404).json({status: 404, data: req.body, message: "data sent to server"})   
    }
    catch (err){
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

// get single product item based on product id
const getSingleItem = async(req, res) => {
    // get id from params entered in Frontend
    // the id is a string use parseInt to convert it to a integer
    const id = parseInt(req.params.productId)
    
    // creates a new client
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    // connect to the client
    await client.connect();

    // connect to  database
    const db = client.db("group-project");
    console.log("connected");

    // connect to database items' collection find & return the product item with the specified _id
    const item = await db.collection("items").findOne({_id:id});      
    item
    ? res.status(200).json({status: 200, data: item,  message: "success"})
    : res.status(404).json({status: 404, data: req.params.productId, message: "data sent to server"})   
    }
    catch (err){
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};

// update single product item based on product id
const updateItem = async(req, res) => {
    // get id from params entered in Frontend
    const _id = parseInt(req.params.productId);

    const queryId = {_id}
    // creates a new client
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
        // connect to the client
        await client.connect();

        // connect to  database
        const db = client.db("group-project");
        console.log("connected");

        // if no id return error
        if(_id === undefined) {
            res.status(404).json({ status: 404, data: req.body, message:"data sent to server" })
            }
        
        if(_id){
            const newValue = {$set: {...req.body}}
            await db.collection("items").updateOne(queryId, newValue)
            res.status(201).json({status: 201, data: newValue,  message: "success"})  
        }        
    }
    catch (err){
        console.log(err.stack)
    }
    // close the connection to the database server
    client.close();
    console.log("disconnected!")
};

module.exports = {
    getAllItems,
    getSingleItem,
    updateItem
};
