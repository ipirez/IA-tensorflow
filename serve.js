require('babel-register')({
  presets: [ 'es2015' ]
});
const express = require('express')
const app = express()
const path = require('path')
const {init} = require('./statistics')
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
app.get('/v1/tensor/:id',(req,res)=>{
  var id = req.params.id
 init().then(data=>{
   res.send(data)
 })
})


