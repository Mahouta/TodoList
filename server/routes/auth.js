const routes = require('express').Router()
var Mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var jwt= require('jsonwebtoken');

const connection = (closure) => {
  return Mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    let db = client.db('todoDb');
    closure(db);
  })
}


routes.post('/register', (req, res) => {
  console.log(typeof (req.body.password));
  if (isEmail(req.body.email) && isPassword(req.body.password) !== "Not Valid") {
    connection(db => {
      db.collection("users").insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        // res.send(result);
      });
      res.send({ email: req.body.email, password: req.body.password });
    });
  } else {
    console.log("document not inserted");
    res.send({ message: "not inserted (data not valid)" });
  }
})


routes.post('/login', async (req, res) => {
  connection(async (db) => {
    const result = await db.collection('users').findOne({ email: req.body.email })
    if (!result) { res.send({ message: "user not found" }) }
    if (result.password !== req.body.password) { res.send({ message: "bad password" }) }
    //result.password = '';
    res.send({ message: 'ok', userToken: jwt.sign({ data: result }, 'my_secrettttt') })
  global.token =userToken;
  })
})



function isEmail(myVar) {
  var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$', 'i');
  return regEmail.test(myVar);
}

function isPassword(psw) {
  var validityPassword = "";
  //verify password
  if (psw.length < 8) {
    validityPassword = "Not Valid";
    //return false;
  } else {

    validityPassword = "bad";

    rea = /[a-z]/;
    reA = /[A-Z]/;
    if (rea.test(psw) && reA.test(psw)) {
      validityPassword = "normal";
    }

    re0 = /[0-9]/;
    rec = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
    if (re0.test(psw) && rec.test(psw)) {
      validityPassword = "good !";
    }
  }
  return validityPassword;
}

module.exports = routes;
