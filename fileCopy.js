
const fs = require('fs');

// fs.writeFile('file1.txt', 'Hello World', (err) => {
//     if (err) {
//         console.error('Error writing to file:', err);
//         return;
//     }
//     console.log('File created successfully.');
// });
fs.readFile('newData.js', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // console.log('File content:'+ data);

    console.log("NUMBER OF LINES: "+ data.toString().split("\n").length)

    // fs.writeFile('file2.txt', data, (err) => {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //         return;
    //     }
    //     console.log('File copied successfully.');
    // });
});