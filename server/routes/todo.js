const routes = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

const connection = (closure) => {
    return MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        let db = client.db('todoDb');
        closure(db);
    })
}

routes.get('/:id', (req, res) => {
     connection(db => {
        db.collection("users").findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
            res.send(result);
        });
    });
})


//insert todo
routes.post('/:id', (req, res) => {
    connection(db => {
        var myId = { _id: ObjectId(req.params.id) };
        db.collection('users').updateOne(myId, { $addToSet: { todo: req.body } }, (err, result) => {
            res.send(result)

        });

    });
})

//update todo
routes.put('/:id/:indexTodo', (req, res) => {
    connection(db => {

        var myId = { _id: ObjectId(req.params.id) };
        var index = req.params.indexTodo;
        var newValue = { $set: { ["todo." + index]: req.body } }
        db.collection('users').updateOne(myId, newValue, (err, result) => {
            res.send(result)
        });
    });
})

// delete todo
routes.delete('/:id/:indexTodo', (req, res) => {
var r ="";
    connection(db => {
        var myId = { _id: ObjectId(req.params.id) };
        var index = req.params.indexTodo;
        db.collection("users").findOne(myId, (err, result) => {
            r = result;
            console.log(result);
            db.collection('users').updateOne(result, { $pull: { todo: result.todo[index] } }, (err, resu) => {
                res.send(resu);
            });
        });
    });
});




module.exports = routes;
