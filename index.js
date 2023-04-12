const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Himazno@12092001",
    database:"himanshudb"
})


app.get("/api/get",(req,res)=>{
    const get = "SELECT * FROM mydb";
    db.query(get,(error,result)=>{
        console.log(error);
        res.send(result);
    });
});

app.post("/api/post",(req,res)=>{
    const {name,password} = req.body;
    res.send(req.body);
    const insert = "INSERT INTO mydb (name , password ) VALUES (?,?)";
    db.query(insert,[name,password],(err,result)=>
    {
        if(err) console.log(err);
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const remove = "DELETE FROM mydb WHERE id = ?";
    db.query(remove,id,(err,result)=>
    {
        if(err) console.log(err);
    })
});

app.get("/api/get/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const sqlGet = "SELECT * FROM mydb WHERE id = ?";
    db.query(sqlGet,[id],(err,result)=>{
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {name,password} = req.body;
    const sqlUpdate = "UPDATE mydb SET name=?,password=? WHERE id = ?";
    db.query(sqlUpdate,[name,password,id],(err,result)=>{
        if(err) console.log(err)
    res.send(result);
});


app.get("/api/view/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const sqlGet = "SELECT * FROM mydb WHERE id = ?";
    db.query(sqlGet,[id],(err,result)=>{
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    });
});







    
    // const insert = "INSERT INTO mydb (name , password ) VALUES ('ThhONY' , 'Styuvbygbk')";
    // db.query(insert,(error,result)=>{
    //     console.log(error);
    //     console.log(result);
    //     res.send("hi..this is response");
    // })
    
});

app.listen(8000,()=>console.log("server started at 8000!!!"));