"use strict";
const { MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI_TORONTO} = process.env;

const options = {
    useNewUrlparser: true,
    useUnifiedTopology:true,
}
// use this package to generate unique ids: 
const { v4: uuidv4 } = require("uuid");


// returns all orders
const getOrders = async(req, res) => {
    
    // creates a new client
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
    // connect to the client
    await client.connect();

    // connect to  database
    const db = client.db("group-project");
    console.log("connected");

    // connect to orders' collection find & return all orders
    const orders = await db.collection("orders").find().toArray();
    
    orders
    ? res.status(200).json({status: 200, data: orders,  message: "success, all orders retrieved"})
    : res.status(404).json({status: 404, data: req.body, message: "data sent to server"})   
    }
    catch (err){
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
};


// create a new order
const createOrder = async(req, res) =>{
    const order = req.body;
    const {price, productId, qty, name, userId} = order;
    const quantity = Number(qty);
    order.orderId = uuidv4();

    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
        await client.connect();
        const db = client.db("group-project");
        console.log("connected!");

        // fetch data for frontend
        const cartOrder = { 
            productId:productId,
            userId:userId,
            price: price,
            qty: quantity,
            name: name            
        }
        
        // find the product item to update inventory
        const item = await db.collection("items").findOne({_id:productId});

        // subtract qty from the product inventory
        const updatedStockAmt = Number(item.numInStock - qty);
        if(item.numInStock >= qty){
            // create the new order
            await db.collection("orders").insertOne(cartOrder);
            
            // update inventory
            await db.collection("items").updateOne(
                // find item based on id                
                {_id:productId},
                // update the product inventory
                {$set: {numInStock:updatedStockAmt}}
            )
            res.status(201).json({status: 201, data: {
                orderId:order.orderId,
                userId:userId,            
                productId:productId,
                price: price,
                qty: quantity,
                name: name                
            }, message: "new order created"})
        }
        else {
            res.status(404).json({ status: 404, data: req.body, message:"not enough stock in inventory" })
        }
    }
    catch (err){
        console.log(err.stack);
    }
    client.close();
    console.log("disconnected!")
}


// update single order based on order id
const updateOrder = async(req, res) => {
    // get id from params entered in Frontend
    const productId = parseInt(req.params.productId)
    
    // quantity of item in cart
    const cartQty = req.body.qty
    
    // // variable for updateOne to locate what to update
    const queryId = {productId}
    
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {        
        await client.connect();

        const db = client.db("group-project");
        console.log("connected");

        // if no id return error
        if(productId === undefined) {
            res.status(404).json({ status: 404, data: req.body, message:"product id undefined" })
            }
        // get data for conditions & updating inventory
        const item = await db.collection("items").findOne({_id:productId});
        
        const order = await db.collection("orders").findOne({productId:productId});
        console.log("order:", order)
        // condition to determine how to update inventory
        let updatedStockAmt = 0;
        if(cartQty) {
            // cart qty less than order add back to inventory
            if (cartQty < order.qty){
                updatedStockAmt = Number(item.numInStock + (order.qty - cartQty))
                await db.collection("items").updateOne(
                    // find item based on id                
                    {_id:productId},
                    // then update the inventory amount
                    {$set: {numInStock:updatedStockAmt}}
                )
                // update order
                // set new values
                const newValue = {$set: {...req.body}}
                // update values of the selected order
                await db.collection("orders").updateOne(queryId, newValue)
                res.status(201).json({status: 201, data: newValue,  message: "success"})  
            } 
            // cart qty equal to order do not update order or inventory
            else if (cartQty === order.qty){
                res.status(404).json({ status: 404, data: req.body, message:"no change was made" })             
            } 
            // cart qty more than order remove it from inventory if stock is > 0
            else if(cartQty > order.qty 
                    && item.numInStock > 0 
                    && ((cartQty) <= item.numInStock + order.qty)){
                    updatedStockAmt = Number(item.numInStock - (cartQty-order.qty))
                    // update stock inventory in database
                    await db.collection("items").updateOne(
                        {_id:productId},
                        {$set: {numInStock:updatedStockAmt}}
                    )
                    // update order
                    // set new values
                    const newValue = {$set: {...req.body}}
                    // update values of the selected order
                    await db.collection("orders").updateOne(queryId, newValue)
                    res.status(201).json({status: 201, data: newValue,  message: "success"}) 

            } else {
                res.status(404).json({ status: 404, data: req.body, message:"not enough stock in inventory" })
            }
        }


        // // update stock inventory in database
        // if(cartQty){
        //     await db.collection("items").updateOne(
        //         // find item based on id                
        //         {_id:productId},
        //         // then update the inventory amount
        //         {$set: {numInStock:updatedStockAmt}}
        //     ) 
        // }
        // update order
        // if(productId){
        //     // set new values
        //     const newValue = {$set: {...req.body}}
        //     // update values of the selected order
        //     await db.collection("orders").updateOne(queryId, newValue)
        //     res.status(201).json({status: 201, data: newValue,  message: "success"})  
        // }        
    }
    catch (err){
        console.log(err.stack)
    }    
    client.close();
    console.log("disconnected!")
};


// delete order item
const deleteOrder = async(req, res) =>{
    const productId = parseInt(req.body.productId);
        
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
        await client.connect();
        const db = client.db("group-project");
        console.log("connected!");

        const item = await db.collection("items").findOne({_id:productId});
        const order = await db.collection("orders").findOne({productId:productId});
        
        // add the qty of items back to  inventory
        const updatedStockAmt = Number(item.numInStock + order.qty);
        
        if(item){
            await db.collection("items").updateOne(
                // find item based on id                
                {_id:productId},
                //  update the inventory
                {$set: {numInStock:updatedStockAmt}}
            ) 
        }
        // delete the order based on productId
        const result = await db.collection("orders").deleteOne({productId:productId});

        if (result.deletedCount === 1) 
        {return res.status(201).json({ status: 201, message:"order deleted"})}
        else {
            res.status(404).json({ status: 404, data: req.body, message: "order Id Not Found" })
        }
    }
    catch (err){
        console.log(err.stack);
    }
    client.close();
    console.log("disconnected!")
}


// delete all items from the cart
const emptyCart = async(req, res) =>{
    const userId = req.body.userId;
    const client = new MongoClient(MONGO_URI_TORONTO, options);
    try {
        await client.connect();
        const db = client.db("group-project");
        console.log("connected!");

        // stretch goals
        // copy the cart to a new collection called purchases
        // await db.orders.aggregate([{$match: {}}, {"$out":"purchases"}])

        // delete the entire card from order
        const result = await db.collection("orders").deleteMany({userId:userId});

        if (result.deletedCount > 0) 
        {return res.status(201).json({ status: 201, message:"cart emptied"})}
        else {
            res.status(404).json({ status: 404, data: req.body, message: "invalid userId unable to empty card" })
        }
    }
    catch (err){
        console.log(err.stack);
    }
    client.close();
    console.log("disconnected!")
}


module.exports = {
    getOrders, 
    updateOrder,
    createOrder, 
    deleteOrder,
    emptyCart
};
