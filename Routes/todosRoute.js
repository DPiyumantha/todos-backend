const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
express.urlencoded({ extended: true });
const router = express.Router();
const TodoModel = require('../models/Todo');

// const db = 'mongodb+srv://dima:4WneUdGhd16Cl37v@todoscluster.d20zw.mongodb.net/todos?retryWrites=true&w=majority';
mongoose.connect(process.env.db||db, ()=>{
    console.log("connected to db");
})
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/todos', (req, res)=>{
    const {title, description} = req.body;
    if(title=='' || description=='' || !title || !description){
        res.status(400).send({
            error : "Empty data"
        })
    }else{
        let todo = new TodoModel({
            title,
            description
        });
        
        todo.save().then((data)=>{
            console.log(data);
            res.send({"messege": "saved"})
        }).catch((err)=>res.send({error: err}))
    }

});


module.exports= router;

// 