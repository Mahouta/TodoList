const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept"); res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
  if ('OPTIONS' === req.method) { return res.send(200); }

  next();
});





const auth = require('./server/routes/auth')
app.use('/auth',auth);

const todo = require('./server/routes/todo')
app.use('/todo',todo);

app.listen(port, (err) => {
    if (err) throw err;
});

