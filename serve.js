require('babel-register')({
  presets: [ 'es2015' ]
});
const express = require('express')
const app = express()
const path = require('path')
const {find,linearRegressionGraphic,linearRegressionData,variance} = require('./statistics')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  next();
});
app.listen(3000);
console.log('//node server start at 3000')
//-> server routing
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'))
})
app.get('/global.js',(req,res)=>{
  res.sendFile(path.join(__dirname+'/global.js'))
})
//-> services 
app.get('/v1/tensorflow/:id',(req,res)=>{
  var id = req.params.id
  find(id).then(data=>{
    res.send(data)
  })
})
app.get('/v1/tensorflow/regression/graphic/:id',(req,res)=>{
  var id = req.params.id
  linearRegressionGraphic(id).then(data=>{
    res.send(data)
  })
})
app.get('/v1/tensorflow/regression/data/:id',(req,res)=>{
  var id = req.params.id
  linearRegressionData(id).then(data=>{
    res.send(data)
  })
})
app.get('/v1/tensorflow/variance/:id',(req,res)=>{
  console.log('at varince ->')
  var id = req.params.id
  variance(id).then(data=>{
    res.send(data)
  })
})
 


