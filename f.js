const fs = require('fs');

fs.readFile('newData.js', (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    let dt = data.toString();
    console.log("File Content:\n" + data);
    let x = dt.split("\n").length;

    console.log(x)
});