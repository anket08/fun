// Create a simple server based Node program which reads a file and print the content
// of the file in the browser. Also, display the count of the word ‘the’ available in the file.

const express=require("express")
const fs=require('fs')

const app=express();
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/display" method="get">
    File: <input type="text" name="fl"><br>
    <button type="submit">Search</button>
</form>
</body>
</html>`)
})

app.get('/display',(req,res)=>{
    const fl=req.query.fl
    fs.readFile(fl,"utf-8",(err,data)=>{
        let cnt=0;
        const dta=data.split(" ")
        for(let i=0;i<=dta.length;i++){
            if(dta[i]==="the"){
                cnt++;
            }
        }

        if(err)console.log(err)
            console.log(data)
        res.send(
            `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1> HEloo</h1>
    ${data}

    <br>
    <br>

    <h1>count: ${cnt} </h1>
</form>
</body>
</html>
            `
        );
    })
})

app.listen(3000,()=>{
    console.log("Stareryro")
})