const express = require('express');
const router = express.Router();
const Todo = require('../models/EasyTodoModels'); // Ensure this path is correct

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.render('index', { todos });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add a new todo
router.post('/', async (req, res) => {
    try {
        console.log("request ====", req.body)
        const existingTodo = await Todo.findOne({ title: req.body.title });
        if (existingTodo) {
            return res.status(400).json({ message: 'Todo item already exists' });
        }

        const todo = new Todo({
            title: req.body.title,
            status: 'pending'
        });

        const newTodo = await todo.save();

        return res.json({
            message: 'Todo item added successfully'
        });
    } catch (err) {
        console.error('Error saving todo:', err);
        return res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
        res.json({ message: `Todo item '${todo.title}' has been deleted` });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
