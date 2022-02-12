const { load, getHeaders } = require('csv-load-sync')
const moment = require('moment')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var filePath = process.argv[2]; // Inputs csv file location into an array from command line argument. Example: ['node','etl.js','path/to/file.csv']
const expectedHeaders = ['SNo', 'Name', 'Symbol', 'Date', 'High', 'Low', 'Open', 'Close', 'Volume', 'Marketcap']
function fileExists() {
    if (fs.existsSync(filePath)) {
        //fileCheck()
    } else {
        throw `${filePath} could not be found. Please check your file location and try again.`
    }
}
function fileCheck() {
    let csvFields = getHeaders(filePath)
    for (i = 0; i < expectedHeaders.length; i++) {
        if (csvFields.includes(expectedHeaders[i])) {
            continue
        } else {
            throw `Houston, we got a problem...This application will only process data if ${filePath} contains the following fields only: ${expectedHeaders}. Please modify those fields and try again.`
        }
    }
}
function transform(result) {
    let highest = parseFloat(0).toFixed(8)
    for (let i = 0; i < result.length; i++) {
        result[i].SNo = `${result[i].SNo}-${result[i].Symbol}`
        delete result[i].Symbol
        result[i].High = parseFloat(result[i].High).toFixed(8);
        result[i].Low = parseFloat(result[i].Low).toFixed(8);
        result[i].Marketcap = parseInt(result[i].Marketcap);
        result[i].Date = result[i].Date.split(' ')[0];
        result[i].Date = new Date(result[i].Date)
        result[i].Date = moment(result[i].Date).format('LL')
        result[i].marketMovement = "Up"
        result[i].Peak = " "
        if (result[i].High > highest) {
            result[i].Peak = highest
        } else {
            result[i].Peak = highest
        }
        if (i == 0) {
            continue
        }
        if (result[i].High > result[i - 1].High) {
            result[i].marketMovement = "Up"
        } else {
            result[i].marketMovement = "Down"
        }
    }
    return result
}
//
function csvWriter(file) {
    let csvWriter = createCsvWriter({
        path: `processed-${filePath}`,
        header: [
            { id: 'SNo', title: 'SNo' },
            { id: 'Date', title: 'Date' },
            { id: 'High', title: 'High' },
            { id: 'Low', title: 'Low' },
            { id: 'Marketcap', title: 'Marketcap' },
            { id: 'marketMovement', title: 'marketMovement' },
            { id: 'Peak', title: 'Peak' }
        ]
    });

    let records = transform(file)

    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
}

try {
    fileExists()
    fileCheck()
    let csv = load(filePath, {
        skip: ['Name', 'Open', 'Close', 'Volume',]
    })
    csvWriter(csv)
} catch (e) {
    console.error(e)
}