const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'started', 'completed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EasyTodo', TodoSchema);
