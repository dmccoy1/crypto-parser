const csv = require('csv-parser');
const fs = require('fs');
let a = []
fs.createReadStream('coin_Bitcoin.csv')
    .pipe(csv())
    .on('data', (row) => {
        a.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(a[0], a[1], a[2], a[3], a[4])

    });
//sleep(5000).then(() => {
console.log(a)
//})

