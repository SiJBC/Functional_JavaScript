import fs from 'fs'
import csv from 'csv-parser'

const aminoAcid = []

// reads virus file
// no arguments but returns a promise
const readVirusFile = function readVirusFile(){
  return new Promise((resolve, reject) => {
    fs.readFile('virus.txt', 'utf8', (err,data) => {
      if (err){
        reject(console.error(err))
        return
      }
      resolve(data)
    })
  })
}

// reads the amino acid csv file
// no arguments
// returns a promise containing the csv data
const readCSVFile = function readCSVFile(){
  return new Promise(resolve => {
    fs.createReadStream('codon-aminoacid.csv')
    .pipe(csv())
    .on('data', row => aminoAcid.push(row))
    .on('end', () => resolve(aminoAcid))
  })
}

// read the vaccine
// no arguments
// returns a promise
const readVaccineFile = function readVaccineFile(){
  return new Promise((resolve, reject) => {
    fs.readFile('vaccine.txt', 'utf8', (err,data) => {
      if (err){
        reject(console.error(err))
        return
      }
      resolve(data)
    })
  })
}
// returns loops through all the files and creates 3 javascript module
// takes all file system functions as arguments
// no return values

Promise.all([readVaccineFile(), readVirusFile(), readCSVFile()]).then(
  values => {
    for (var i = 0; i < values.length; i ++){
      writeFile(values[i], i)
    }
  }
)

// function for creating javascript file as module


function writeFile(value, index){
  let fileName = JSON.stringify(index) 
  let functionName = JSON.stringify(index)
  let functionString = `export default function _${functionName}() {return ${JSON.stringify(value)}}`
  fs.writeFile(`_${fileName}.js`, functionString, err => {
    if(err) throw err
})
}






