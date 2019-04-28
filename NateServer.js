const express = require('express')
const app = express()
const uuidv4 = require('uuid/v4')

// Fake Database - A collection of Wizard objects(resource)
let wizards = [
    {
        name: "Harry Potter",
        age: 16,
        isGood: true,
        favClasses: ["Potions", "Defense Against Dark Arts", "Quidditch"],
        hasOwl: true,
        house: "Stair-closet/Gryffindor",
        _id: uuidv4()
    },
    {
        name: "Ron Weasley",
        age: 16,
        isGood: true,
        favClasses: ["Potions", "Defense Against Dark Arts"],
        hasOwl: false,
        house: "Mystical house/Gryffindor",
        _id: uuidv4()
    },
    {
        name: "Belatrix Lestrange",
        age: 40,
        isGood: false,
        favClasses: ["forbidden spells", "Dark magic", "killing good guys"],
        hasOwl: false,
        house: "none/voldemort",
        _id: uuidv4()
    }
]


// Middlewares for every request
app.use(express.json()) // req.body = Object from POST and PUT requests


// Routes - Endpoints
// GET ALL - GET COLLECTION
app.get("/wizards", (req, res) => {
    res.send(wizards)
})

// GET ONE - GET SINGLE RESOURCE
app.get("/wizards/:_id", (req, res) => {
    // Find the wizard with this ID in the fake DB
    const foundWizard = wizards.find(wizard => wizard._id === req.params._id)
    // Send single wizard resource(object) to front-end
    res.send(foundWizard)
})

// POST - INSERT ONE
app.post("/wizards", (req, res) => {
    // Get user's post object out of req.body
    const newWizard = req.body
    // Add ID to newWizard
    newWizard._id = uuidv4()
    // Add newWizard to Fake DB
    wizards.push(newWizard)
    // Send back updated DB
    res.send(wizards)
})

// DELETE - Delete One
app.delete("/wizards/:_id", (req, res) => {
    // Find the wizard to delete
    const wizardToDelete = wizards.find(wizard => wizard._id === req.params._id)
    // Created updated array that does not include that wizard object
    const updatedDB = wizards.filter(wizard => wizard._id !== wizardToDelete._id)
    // Re-assign database to be the updated array
    wizards = updatedDB
    res.send(wizards)
})


// PUT - Update One
app.put("/wizards/:_id", (req, res) => {
    // Find the wizard to update by their id
    const wizardToUpdate = wizards.find(wizard => wizard._id === req.params._id)
    // Update object with req.body to get updated wizard
    const updatedWizard = Object.assign(wizardToUpdate, req.body)
    // Map through old DB and replace old object with updated Object
    const updatedDB = wizards.map(wizard => wizard._id === updatedWizard._id ? updatedWizard : wizard)
    //  Update Database array
    wizards = updatedDB
    // Send back updated DB
    res.send(wizards)
})




app.listen(7000, () => {
    console.log("Server is running on Port 7000")
}) 