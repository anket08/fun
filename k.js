const express = require("express");
const mon = require("mongoose")
const cook = require("cookie-parser")
const session = require("express-session")

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cook())
app.use(session({
    secret: "anket"
}))

mon.connect("mongodb://127.0.0.1:27017/vit")
    .then(() => { console.log("mongo connecteddddddd") })
    .catch((e) => { console.log(e) })

const vitSchema = new mon.Schema({
    name: String,
    age: Number,
    cgpa: Number
});

const VIT = mon.model("vit", vitSchema)


app.get("/", (req, res) => {

    const last = req.cookies.lastSrch || "NONE";

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/enter" method="post">
       Name: <input type="text" name="name" > <br>
       Age: <input type="number" name="age"><br>
        Cgpa:<input type="number" step="0.01" name="cgpa"><br>
        <button type="submit">Submit</button>
    </form>

    <form action="/display" method="get">
        <h1>Last Searched cgpa is ${last} , you can srch more</h1>
        <input type="number" step="0.01" max="10" name="cgpa">
        <button type="submit">Search</button>
    </form>
</body>
</html>`)
})

app.post("/enter", (req, res) => {
    const { name, age, cgpa } = req.body;

    const student = new VIT({
        name: name,
        age: age,
        cgpa
    })

    student.save();

    res.send("Student saved" + `\n  <a href="/">Go Back</a>`)
})

app.get('/display', async (req, res) => {
    const cgpa = req.query.cgpa;
    const rs = await VIT.find({ cgpa: { $gte: cgpa } })
    res.cookie("lastSrch", cgpa)

    if (!req.session.count) {
        req.session.count = 1;
    }
    else {
        req.session.count++;
    }
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <h2> Students with cgpa greater than eq to ${cgpa}: </h2>
    <p>Total Searches (Session): ${req.session.count}</p>
    <table border="1">
        <tr>
            <th>
                Name
            </th>
            <th>
                Age
            </th>
            <th>
                Cgpa    
            </th>
        </tr>
       
        
        ${rs.map(item =>
        `<tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.cgpa}</td>
        </tr>

        `).join("")}
<a href="/">Go Back</a>
     
</table>
</body>
</html>
        
`)
})

app.listen(3000, () => {
    console.log("Run at 3000")
})