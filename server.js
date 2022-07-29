const express = require('express') // making it possible to use express in this file
const app = express() // setting a constant and assigning it to the instance of express
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods associated with MongoClient and talk to our DB
const PORT = 2121 //setting a constant to define the location where our server will be listening
require('dotenv').config()// allows us to look for variables inside of the .env file



let db, //declare a variable db
    dbConnectionStr = process.env.DB_STRING,//declaring a variable and assigning our db connection string to it
    dbName = 'todo' // declaring a variable and assigining the name of the db we will be using

// DB connection
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })//Creating a connection to MongoDB, and passing in our connection string
    .then(client => {//waiting for connection and proceeding if successful, and passing in all the client information
        console.log(`Connected to ${dbName} Database`)//log to the console template literal connected to the todo databse
        db = client.db(dbName) //assigning a value to previously declared variable that contains a db client factory method
    })

//Middleware
app.set('view engine', 'ejs') //sets ejs as default render method
app.use(express.static('public'))//sets default folder for static assets
app.use(express.urlencoded({ extended: true }))// tells express to decode and encode URLs where the header matches the content. Supports array and objects
app.use(express.json())//Parses JSON content from incoming requests


app.get('/', async (request, response)=>{ //starts a GET method when the root route is passed in, sets up req and res params
    //sets a constant and awaits  all todo items from DB
    const todoItems = await db.collection('todos').find().toArray()
    //sets a constant and awaits number of non-completed todo tasks
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    //rendering ejs file and passing through the db items and the count remaining inside of an object
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { //starts a POST method when the route addTodo is passed in, sets up req and res params
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})  //insert a new item into todos collection, gives it value completed false by default
    .then(result => {//if insert is successful do something
        console.log('Todo Added')//log to the console
        response.redirect('/') //gets rid of addTodo route and redirect to home page
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {//starts a PUT method when the route markComplete is passed in, sets up req and res params
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{//look in the db for one item matching the name of item passed in from main.js file that was clicked on
        $set: {
            completed: true //set completed status to true
          }
    },{
        sort: {_id: -1},//moves item to the bottom of the list 
        upsert: false //prevents insertion if item does not exist already 
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete') //sending response back to the sender
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {//starts delete method when the deleteItem route is passed 
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //look in the db for one item matching the name of item passed in from main.js file that was clicked on
    .then(result => { //starts then if delete was successful
        console.log('Todo Deleted')
        response.json('Todo Deleted')//sending a response back to the sender
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{ //setting up which port we will be listening on either the port from the .env
    console.log(`Server running on port ${PORT}`)
})