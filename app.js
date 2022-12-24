// Task1: initiate app and run server at 3000
var express = require('express');
var Bodyparser = require('body-parser');
var Mongoose = require('mongoose');
var Cors = require('cors');

var app = new express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));
app.use(Cors());

app.get('/api/employeelist',(req,res)=>{
    res.send('Welcome')
});

app.listen(3000,()=>{
    console.log('server start listening');
})

const path=require('path');
const { employeeModel } = require('./model/employee');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://prajeesha:malavika@cluster0.ofqpaei.mongodb.net/employeeDb?retryWrites=true&w=majority",{useNewUrlParser:true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.post('/api/employeelist/viewall',(req,res)=>{
    employeeModel.find(
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json(data);
            }
        }
    )   
});


//TODO: get single data from db  using api '/api/employeelist/:id'
app.post('/api/employeelist/:id/search',(req,res)=>{
    let id = req.params.id;
    var data = req.body;
    employeeModel.find(data,
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json(data);
            }
        }
    )
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist/add',async(req,res)=>{
    var data = req.body;
    var employee = new employeeModel(data);
    await employee.save(
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json({"status":"success","data":data})
            }
        }
    );
    console.log(data);   
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/delete',(req,res)=>{
    var position = req.body.position;
    var data = req.body;
    employeeModel.findOneAndDelete(
        {"position": position},
        data,(err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json({"status":"data deleted","data":data})
            }
        }
    )
});


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/update',(req,res)=>{
    var position = req.body.position;
    var data = req.body;
    employeeModel.findOneAndUpdate(
        {"position": position},
        data,(err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json({"status":"Updated Successfully","data":data})
            }
        }
    )
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



