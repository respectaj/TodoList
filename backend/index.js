const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(cors());
app.use(bodyparser.json());


// database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tododb',
    port:3306
});


//check database connection

db.connect(err=>{
    if (err) {console.log(err,'dberr');}
    console.log('database connected...');
})


//get all data

app.get('/user',(req,res)=>{
    
    let qr = `select * from user`;

    db.query(qr,(err,result)=>{

        if(err)
        {
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            });
        }

    });
});



//get single data
app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = `SELECT * from user WHERE id = '${gID}'`;

    db.query(qr,(err,result)=>{

        if(err) {console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }


    });

});


//create or post
app.post('/user',(req,res)=>{

    console.log(req.body,'createdata');

    let _title = req.body.title;
    let _description = req.body.description;

    let qr = `insert into user(title,description)
              values('${_title}','${_description}')`;

    db.query(qr,(err,result)=>{

        if (err){console.log(err);}

        console.log(result,'result')
        res.send({
            message:'data inserted',
        });
    });

});


//update single data or put single data
app.put('/user/:id',(req,res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let _title = req.body.title;
    let _description = req.body.description; 

    let qr = `update user set title = '${_title}', description = '${_description}'
              where id = '${gID}'`;

    db.query(qr,(err,result)=>{

        if (err) {console.log(err);}

        res.send({
            message:'data updated'
        });
    });
})


//Delete single data
app.delete('/user/:id',(req,res)=>{

    let qID = req.params.id;

    let qr = `delete from user where id = '${qID}'`;

    db.query(qr,(err,result)=>{

        if (err) {console.log(err);}

        res.send(
            {
                message:'data deleted'
            }
        )
    });
});



//listen on port 3000
app.listen(3000,()=>{
    console.log('server running..');
});