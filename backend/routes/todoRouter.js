var express = require('express')
var router = express.Router()
var todoLib = require('../lib/todoLib')

router.use(function timeLog (req, res, next) {
    console.log('TODO Route Time: ', Date.now())
    next();
})

/*
router.get('/', function (req, res) {
    todoLib.getAllTodos(function(err, items){
        if(err)
            res.json({'error': err});
        else
            res.json(items);
    })
})
*/
router.route('/')
    .get(function (req, res) {
        todoLib.getAllTodos(function(err, items){
            if(err)
                res.json({'error': err});
            else
                res.json(items);
        })
    })
    .post(function(req, res){
        todoLib.createTodo(req.body, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })  
    });

router.route('/:todoid')
    .get(function(req, res){
        todoLib.getTodoById(req.params.todoid, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })
    .put(function(req, res){
        req.body.id = req.params.todoid;
        todoLib.editTodo(req.body, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })
    .delete(function(req, res){
        todoLib.deleteTODO(req.params.todoid, function(err, item){
            if(err)
                res.json({'error': err});
            else
                res.json(item);
        })
    })


module.exports = router