// Create a MongoDB database named as your register number. Create a collection
// products which represents product number, product name, product type(like fruits, veg,
// dairy, stationary), quantity and price

// B. Create a Node program with express, mongoose and multi routing. The default
// routing collects the details of a product as mentioned in part-A. The next routing
// receives all these values and insert into the collection. Finally, display the result
// whether document is inserted or not in the browser.


const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-parser')
const session = require('express-session')

const app = express();
app.use(express.urlencoded({extended : true}))
app.use(cookie())

app.use(session({
    secret:"1223"
}))

mongoose.connect("mongodb://127.0.0.1:27017/MCA0073").then(()=>{
    console.log("mongo connected")
}).catch((err)=>{console.log(err)})

const mcaSchema=new mongoose.Schema({
    pno:Number,
    pname:String,
    ptype:String,
    qty:Number,
    price:Number
})

const MCA=mongoose.model("mca",mcaSchema)


app.get('/',(req,res)=>{

    const ls=req.cookies.lastSrch || "saale srch to karle pehle"
    res.send(
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/sub" method="post">
        PNO: <input type="number" name="pno" id="">
        <br>
        pmame <input type="text" name="pname" id="">
        <br>
        <select name="ptype" id="">
            <option value="fruits">fruits</option>
            <option value="dairy">dairy</option>
            <option value="vegetables">vegetables</option>
        </select> <br>
        
        Qtuy: <input type="number" name="qty" id="">
        <br>
        Price: <input type="number" name="price" id="">
        <button type="submit">Submit</button>
    </form>

    <form action="srch" method="get">
        <h1>Search By Category && Last Srched is ${ls}</h1>
        <select name="ptype" id="">
            <option value="fruits">fruits</option>
            <option value="dairy">dairy</option>
            <option value="vegetables">vegetables</option>
        </select> <br>
    <button type="Search">Submit</button>
        
    </form>
</body>
</html>`
    )
})

app.post('/sub',(req,res)=>{
    const {pno,pname,ptype,qty,price}=req.body;
    
    const record=new MCA({
        pno,pname,ptype,qty,price
    })
    record.save()
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

       <h1> ${ptype} named ${pname} with id ${pno} saved in db</h1>
    <a href="/">Go back</a>
</body>
</html>
        
        `)
})


app.get('/srch',async(req,res)=>{
    const cat=req.query.ptype;
    res.cookie("lastSrch",cat)

    if(req.session.cnt){
        req.session.cnt++;
    }
    else{
        req.session.cnt=1;
    }
    const ress= await MCA.find({ptype:cat})
    res.send(` <h2>Visited: ${req.session.cnt}</h2>

    <table border="1">
        <tr>
            <th>PNO</th>
            <th>Name</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
        </tr>

        ${ress.map(item => `
        <tr>
            <td>${item.pno}</td>
            <td>${item.pname}</td>
            <td>${item.ptype}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
        </tr>
        `).join("")}
    </table>

    <br><a href="/">Go Back</a>`)
})

app.listen(3000,()=>{console.log("startesd")})
