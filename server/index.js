const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "user1",
    password: "Dev@12345",
    database: "mydatabase"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM medkyc WHERE dt=1";
    db.query(sqlGet, (error,result)=>{
        res.send(result);
    });
});

app.post("/api/post",(req,res)=>{
    const {name,pan,gst,acc} = req.body;
    const sqlInsert = "INSERT INTO medkyc(name,pan,gst,acc) VALUES(?,?,?,?)";
    db.query(sqlInsert,[name, pan, gst , acc],(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    // const sqlDelete = "UPDATE medkyc SET dt=0 WHERE id=?";
    const sqlDelete = "DELETE FROM medkyc WHERE id=?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});


app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM medkyc WHERE id=?";
    db.query(sqlGet, id, (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const {name,pan,gst,acc}=res.body;
    const sqlUpdate = "UPDATE medkyc SET name=?,pan=?,gst=?,acc=? WHERE id=?";
    db.query(sqlGet,[name,pan,gst,acc], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});



app.get("/",(req,res)=>{
    // const sqlGet = "SELECT * FROM medkyc";
    // // const sqlInsert = "INSERT INTO medkyc(name,pan,gst,acc) VALUES('demo new','987PAN63210','142GST36987','2365147890')";
    // db.query(sqlGet, (error, result)=>{
    //     console.log("error:",error);
    //     console.log("result:",result);
    //     res.send(result);
    // })
    res.send("Hello Express");
})

app.listen(1024, () =>{
    console.log("Port 1024 activate.");
})