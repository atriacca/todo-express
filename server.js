const express = require('express')
const app = express()
const uuidv4 = require('uuid/v4')

// Fake Database - A collection of todos objects(resource)
let todos = [
    {
        "name": "Wash car",
        "description": "Wash my car",
        "imageUrl": "https://wallpapercave.com/wp/ukgCCbT.jpg",
        "completed": false,
        "_id": uuidv4()
    },
    {
        "name": "Make chili",
        "description": "Make my chili",
        "imageUrl": "http://cornmaiden.com/wp-content/uploads/2015/01/Chili-cooking.jpg",
        "completed": false,
        "_id": uuidv4()
    },
    {
        "name": "Vacuum",
        "description": "Vacuum my place",
        "imageUrl": "https://www.macadamfloors.com/wp-content/uploads/2012/12/Portland-Carpet-Baby-Vacuuming.jpg",
        "completed": false,
        "_id": uuidv4()
    },
    {
        "name": "Make workspace",
        "description": "Make workspace",
        "imageUrl": "https://gethppy.com/wp-content/uploads/2017/07/How-Decluttering-Your-Workspace-Can-Make-You-A-Better-Employee.jpeg",
        "completed": false,
        "_id": uuidv4()
    },
    {
        "name": "Do taxes",
        "description": "Do taxes",
        "imageUrl": "https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/14/78/fotolia_1882452_XS.jpg",
        "completed": false,
        "_id": uuidv4()
    }
]

// Middlewares for every request
app.use(express.json()) // req.body = Object from POST and PUT requests


// Routes - Endpoints
// GET ALL - GET COLLECTION
app.get("/todos", (req, res) => {
    res.send(todos)
})

// GET ONE - GET SINGLE RESOURCE
app.get("/todos/:_id", (req, res) => {
    // Find the todos with this ID in the fake DB
    const foundTodos = todos.find(todos => todos._id === req.params._id)
    // Send single todos resource(object) to front-end
    res.send(foundTodos)
})


// POST - INSERT ONE
app.post("/todos", (req, res) => {
    // Get user's post object out of req.body
    const newTodo = req.body
    // Add ID to newTodo
    newTodo._id = uuidv4() // uuidv4() must be in " " in Postman to work
    // Add newTodo to Fake DB
    todos.push(newTodo)
    // Send back updated DB
    res.send(todos)
})

// DELETE - Delete One
app.delete("/todos/:_id", (req, res) => {
    // Find the Todo to delete
    const todoToDelete = todos.find(todo => todo._id === req.params._id)
    // Created updated array that does not include that todo object
    const updatedDB = todos.filter(todo => todo._id !== todoToDelete._id)
    // Re-assign database to be the updated array
    todos = updatedDB
    res.send(todos)
})


// PUT - Update One
app.put("/todos/:_id", (req, res) => {
    // Find the Todo to update by their id
    const todoToUpdate = todos.find(todo => todo._id === req.params._id)
    // Update object with req.body to get updated Todo
    const updatedTodo = Object.assign(todoToUpdate, req.body)
    // Map through old DB and replace old object with updated Object
    const updatedDB = todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo)
    //  Update Database array
    todos = updatedDB
    // Send back updated DB
    res.send(todos)
})




app.listen(7000, () => {
    console.log("Server is running on Port 7000")
}) 