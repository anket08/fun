const fs = require('fs')
const express = require('express')
app = express()

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/post" method="post">
       Name: <input type="text" name="name" placeholder="name"> <br>
        Email: <input type="email" name="email" placeholder="email"> <br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>`
    )
})

app.post("/post", (req, res) => {
    const { name, email } = req.body
    console.log(name, email)
    const DATA = `Name: ${name}, Email: ${email} \n`
    res.send("Data received and saved")
    fs.appendFile("xx.txt", DATA, (err) => {
        if (err) {
            console.log("Error writing to file")
        } else {
            console.log("Data saved to file")
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
