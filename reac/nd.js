const http = require("http");
const obj = require("./def.js");

const dt = new Date();

http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/html"});

    res.write("Hello Avg: " + obj.avg([10,3,1,30]) + "<br>");

    res.write("Year: " + dt.getFullYear() + "<br>");
    res.write("Month: " + (dt.getMonth()+1) + "<br>");
    res.write("Date: " + dt.getDate() + "<br>");
    res.write("Day: " + dt.getDay() + "<br>");
    res.write("Time: " + dt.toDateString());

    console.log("hi");

    res.end();

}).listen(3000, () => {
    console.log("Server running on port 3000");
});