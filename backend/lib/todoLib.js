var TodoModel = require('../models/todoModel');

exports.getAllTodos = function (cb) {
    console.log('Getting All TODOS');
    var query = {}; // get all
    TodoModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
};

exports.getTodoById = function(id, cb){
    console.log('Getting Single TODO with ID '+id);
    TodoModel.findById(id, function (err, singleDBItem) {
        cb(err, singleDBItem);
    });
}

exports.getTodoByQuery = function(query, cb){
    console.log('Getting Single TODO with Query '+JSON.stringify(query));
    TodoModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
}

exports.createTodo = function (todoDetails, cb) {
    console.log('Create New TODO for ' + JSON.stringify(todoDetails));
    var ti = new TodoModel(todoDetails);
    ti.save(function (err) {
        cb(err, ti);
    });
};

exports.editTodo = function (todoDetails, cb) {
    console.log('Edit Resource ' + todoDetails.id);
    TodoModel.findById(todoDetails.id, function (err, qObj) {
        if (err)
            cb(err, null);
        else {
            if (todoDetails._id)
                delete todoDetails._id;

            console.log(JSON.stringify(todoDetails));
            for (var p in todoDetails) {
                //console.log(todoDetails[p])
                qObj[p] = todoDetails[p];
            }

            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};


exports.deleteTODO = function (id, cb) {
    console.log('Delete Resource ' + id);
    TodoModel.findById(id, function (err, qObj) {
        if (err)
            cb(err, null);
        else {
            qObj.is_deleted = true;
            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};