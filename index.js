// const os = require("os");
// const express = require("express");


// const app = express();
// const port = 3000;

// var reqTime = function (req, res, next){
//     req.reqTime = new Date();
//     next();
// }

// app.use(reqTime);

// app.get('/', (req, res) => {
//     console.log("Request date: " + `${req.reqTime} `);
//     res.send("get");
// });

// app.post("/", (req, res) => {
//     res.send("post");
// });

// app.put("/", (req, res) => {
//     res.send("put");
// });

// app.patch("/", (req, res) => {
//     res.send("patch");
// });

// app.delete("/", (req, res) => {
//     res.send("delete");
// });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });


// var express = require('express');
// var app = express();

// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now();
//   next();
// };

// app.use(requestTime);

// app.get('/', function (req, res) {
//   var responseText = 'Hello World!';
//   responseText += 'Requested at: ' + req.requestTime + '';
//   res.send(responseText);
// });

// app.listen(3000);
const express = require('express');
const http = require('http');
const cors = require('cors');
const { timeStamp } = require('console');
const bodyParser = require('body-parser');
;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(express.json());

app.use((req, res, next) => {
  // console.log('URL = ', req.url);
  // console.log('Original_URL = ', req.originalUrl);
  // console.log('METHOD = ', req.method);
  // console.log('HOST = ', req.headers.host);
  // console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.get("/sum", (req, res) =>{
  console.log(req.params.body.a);
  let summ = parseInt(req.body.a) + parseInt(req.body.b);
  res.status(200).json({
    summ
    });
  });

app.post("/withoutJSONExpress", (req, res) =>{
  console.log(req.body.a);
  // let summ = parseInt(req.body.a) + parseInt(req.body.b);
  // res.status(200).json({
  //   summ
  //   });
  });

app.get("/reverseCase", (req, res) =>{
  let tmp = [];

  for (let i = 0; i < req.body.a.length; i++)
  {
    if (req.body.a[i] == req.body.a[i].toLowerCase()) tmp[i] = req.body.a[i].toUpperCase();
    else tmp[i] = req.body.a[i].toLowerCase();
  }

  a = tmp.join("");

  res.status(200).json({
    message: a
  });
});

app.get("/reverseArray", (req, res) =>{
  let tmp = [];
  for (let i = 0; i < req.body.a.length; i++) tmp[req.body.a.length - i - 1] = req.body.a[i];
  res.send(tmp);
});

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})