// import all local data
import vaccineTxt from "./_0.js"
import virusTxt from "./_1.js"
import codonAminoJSON from "./_2.js"

// assign our data into variables for easy access use var for type re-assignment
var virus = virusTxt()
var vaccine = vaccineTxt()
// use const for codon amino to represent no re-assignment
const codonAmino = codonAminoJSON()

// returns the amino acid from the corresponding array
function getAminoAcid(codon){
    for(var i =0; i < codonAmino.length; i++){
        if(codonAmino[i].codon === codon)
        return codonAmino[i].aminoacid
    }
}
function readCodons(file){
    return file.match(/.{1,3}/g)
}
// convert to codon arrays
virus = readCodons(virus)
vaccine = readCodons(vaccine)

// compares a given attempt by matching the codons to the vaccine
// attempt - is the attempted change
// target - is the vaccine or the point of comparison
function compare(attempt, target){
    var count = 0
    for(var i = 0; i < target.length; i++){
        if (attempt[i] == target[i]){
            count ++
        }
    }
    return (100 * (count / target.length)).toFixed(2)
}
// function for optimising codons
// takes a list of codons to optimise
// returns a list of optimised codons

function optimise_codons(codons){
let optimised = []
for(var i =0; i < codons.length; i++){
    // attempt to replace a codon with a G
    let attempt = codons[i].slice(0,2) + "G"
    if ( getAminoAcid(attempt) != getAminoAcid(codons[i]) ){
        // attempt to replace a codon with a C
        attempt = codons[i].slice(0,2) + "C"
        if ( getAminoAcid(attempt) != getAminoAcid(codons[i]))
        {
            attempt = codons[i]
        }
    }
    optimised.push(attempt)
}
return optimised
}
const optimised = optimise_codons(virus)

// compare virus and optimised version to vaccine
const virusComparison = compare(virus, vaccine)
const optimisedComparison = compare(optimised, vaccine)

// output the results
console.log(`virus comparison: ${compare(virus, vaccine)}% identical to vaccine`)
console.log(`optimised comparison: ${compare(optimised, vaccine)}% identical to vaccine`)
console.log(`Optimisation improves compatability by ${optimisedComparison - virusComparison}%`)
