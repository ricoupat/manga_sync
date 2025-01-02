const express = require('express')
const employee = require('../models/Members')

// This help convert the id from string to ObjectId for the _id.
const { ObjectId } = require('mongodb');

const router = express.Router();

// This section will help you get a list of all the employees.
router.get("/", async (req, res) => {
    try {
        const employeeResult = await employee.collection.find({}).toArray()
        res.send(employeeResult).status(200);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// This section will help you get a single employees by id
router.get("/:id", async (req, res) => {
    try {
        const employeeResult = await employee.collection.findOne({_id: new ObjectId(req.params.id) })
        res.send(employeeResult).status(200);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});

// This section will help you create a new employee.
router.post("/", async (req, res) => {
    console.log("Request body:", req.body);
    const { Name, description } = req.body;

    if (!Name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    const newEmployee = new employee({ Name, description });

    try {
        const employeeResult = await newEmployee.save();

        if (!employeeResult) throw new Error('Something went wrong saving the Todo')
        res.status(201).json(employeeResult)
    } catch (error) {
        console.error(error);
        res.status(500).json("Error adding Employee");
    }
});

// This section will help you update an employee by id.
router.patch("/:id", async (req, res) => {
    try {
        const employeeResult = await employee.collection.updateOne({_id: new ObjectId(req.params.id) }, { $set: req.body })
        if (employeeResult.matchedCount === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.send(employeeResult).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating employee");
    }
});

// This section will help you delete an employee
router.delete("/:id", async (req, res) => {
    try {
        const removed = await employee.collection.deleteOne({ _id: new ObjectId(req.params.id) })

        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;