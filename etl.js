const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('coin_Bitcoin.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });