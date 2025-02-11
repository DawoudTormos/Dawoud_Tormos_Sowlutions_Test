//importing fs module to read the csv file
const fs = require("fs");

//suits, animals and fruits options
let suits = ["Diamonds","Hearts","Spades","Clubs","Joker"]
,animals = ["Lion", "Fox" , "Parrot", "Seal", "Snake"]
,fruits = ["Apple", "Bananas", "Mango", "Watermelon","Papaya" ]

let suitsValues = [], animalsValues = [] , fruitsValues = []
let suitsProbabilities = [], animalsProbabilities = [] , fruitsProbabilities = []

for(let i = 0; i < 5 ; i++){
    suitsValues[i] = {wons : 0, losses : 0}
    animalsValues[i] = {wons : 0, losses : 0}
    fruitsValues[i] = {wons : 0, losses : 0}
}


let i = 0
let data = fs.readFileSync("prediction.csv", "utf-8");



function processCSVData(data){//Counting wins and losses

    let rows = data.split("\n")

        for(let row of rows){
        let cells = row.split(",")
        if (i != 0 && i < rows.length-1) {

                //debugging
                /*console.log(cells[0] , suits.indexOf(cells[0])) 
                console.log(cells[1] , animals.indexOf(cells[1])) 
                console.log(cells[2] , fruits.indexOf(cells[2])) */

                if(cells[3].trim() == "False"){
                    suitsValues[suits.indexOf(cells[0].trim())]["losses"]++
                    animalsValues[animals.indexOf(cells[1].trim())]["losses"]++
                    fruitsValues[fruits.indexOf(cells[2].trim())]["losses"]++
                }else if(cells[3].trim() == "True") {
                    suitsValues[suits.indexOf(cells[0].trim())]["wons"]++
                    animalsValues[animals.indexOf(cells[1].trim())]["wons"]++
                    fruitsValues[fruits.indexOf(cells[2].trim())]["wons"]++

                }

            }
            i++


        }
    


  }


  function calculateProbabilities(){//calculating probabilities from the numbers of wins and losses
    for(let i = 0; i < 5 ; i++){
        //console.log(suitsValues[i]["losses"])//debugging
        suitsProbabilities[i] = suitsValues[i]["wons"] / ( suitsValues[i]["wons"] + suitsValues[i]["losses"])
        animalsProbabilities[i] = animalsValues[i]["wons"] / ( animalsValues[i]["wons"] + animalsValues[i]["losses"])
        fruitsProbabilities[i] = fruitsValues[i]["wons"] / ( fruitsValues[i]["wons"] + fruitsValues[i]["losses"])

    }
  }


  function probabilityToBeatBoss(suit , animal , fruit){// avrage of the 3 probabilities

    return (suitsProbabilities[suits.indexOf(suit.trim())] + animalsProbabilities[animals.indexOf(animal.trim())] + fruitsProbabilities[fruit.indexOf(fruit.trim())]) / 3
  }



//Main Section:

processCSVData(data)
calculateProbabilities()

console.log("probability to win:" , probabilityToBeatBoss('Hearts' , 'Lion',"Mango"))
//