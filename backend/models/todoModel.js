const mongoose = require('mongoose')

var todoSchema = new mongoose.Schema({
    todoId: Number,
    title: String,
    completed: Boolean,
    created_date: {type: Date, default: Date.now },
    completed_date: {type: Date, default: Date.now },
    is_deleted: {typpe: Boolean, default:false},
    last_edited_date: Date
})

module.exports = mongoose.model('Todo', todoSchema)