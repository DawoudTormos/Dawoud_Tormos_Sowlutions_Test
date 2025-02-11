/*
This part of problem 4 gets the key
*/

//importing the node modules needed
const readline = require("readline-sync");// for waiting the user's enter
const fs = require("fs");//for reading the file
var SpellChecker = require('simple-spellchecker');



//loading the file of the encrypted message
let encryptedMsg = []
data = fs.readFileSync("p059_cipher.txt", { encoding: 'utf8', flag: 'r' });
encryptedMsg = data.split(",")



//XORing functions.
//I wrote and tested the 3 functions but used the 3rd for this case

function XOR_StringWithString(data, key) { //XORing a string with a string key
    let result = "";  
      
    for ( let i = 0; i < data.length; i++ ) {  
        result += String.fromCharCode( data.charCodeAt( i ) ^ key.charCodeAt( i % key.length ));  
    }  
  
    return result;  
}  

function XOR_AsciiWithString(data, key) {  //XORing an Ascii array with a string key
    let result = "";  
      
    for ( let i = 0; i < data.length; i++ ) {  
        result += String.fromCharCode( data[i] ^ key.charCodeAt( i % key.length ));  
    }  
  
    return result;  
}  


function XOR_AsciiWithAscii(data, key) {  //XORing an Ascii array with a Ascii array key
    let result = "";  
      
    for ( let i = 0; i < data.length; i++ ) {  
        result += String.fromCharCode( data[i] ^ key[ i % key.length ]);  
    }  
  
    return result;  
}  
//Debugging and Testing
/*
let plaintext = "Hello, XOR!";  
let encryptionKey = "sow";  
  

let encrypted = XOR_StringWithString(plaintext, encryptionKey);  
//console.log(" Encrypted : ", encrypted );  
  
let decrypted = XOR_StringWithString( encrypted, encryptionKey );  
//console.log(" Decrypted : ", decrypted);  

let encrypted2 = XOR_AsciiWithString(encryptedMsg, encryptionKey);  
console.log(" Encrypted : ", encrypted2 );  
  
let decrypted2 = XOR_AsciiWithString( encryptedMsg, encryptionKey );  
//console.log(" Decrypted : ", decrypted2);  
*/





/* 
The below function goes through all possible ascii characters combinations with the key length entered as the second parameter.

First parameter keyIndex is used for recursion and should be always be called with value zero.

With each combination the first 40 characters are XORred with encrypted message and tested for if it looks like a human text

For the absence of a language model for detecting human text, i checked if the text is alphanumeric or conatin symbols (valid characters) and has some spaces (which is the normal case for human text)
*/
let key=[]
let possibleSolutions = []
function bruteForceRecursive(keyIndex, keyLen){
    
    for(let i = 0 ; i < 127 ; i++){
        key[keyIndex] = i
        if(keyIndex == keyLen-1){
            let res = XOR_AsciiWithAscii(encryptedMsg.slice(0,40) , key)
          if(isAlphaNumericOrSymbols(res) && countSpaces(res) > 3){
            let keyString =""
            for(asciiChar of key){keyString+=String.fromCharCode(asciiChar)}
            console.log(res , key," ", keyString)
            let temp = {result: res , keyString:keyString}
            possibleSolutions.push(temp) 
        }
        }else{
            bruteForceRecursive(keyIndex+1, keyLen)
        }
    }

}


function isAlphaNumericOrSymbols(input) {
    let val = input.trim(); 
    let RegEx = /^[a-z0-9 \[\]]+$/i; 
    let Valid = RegEx.test(val);

    return Valid

    //Debugging
    /*if (Valid) {
        console.log("The input is valid and alphanumeric.");
        
    } else {
        console.log("The input is invalid. Only alphanumeric characters are allowed.");
    }*/
}


function countSpaces(str){
    return (str.match(/ /g) || []).length
}




// main section code:
    
    let maxLengthToCheck = 3 //Should be increased if the key could be bigger than 3 characters
    for(let i = 1 ; i <= maxLengthToCheck ; i++){
        console.log("Searching for keys with length: ",i)
        console.log("Press enter to start")
        readline.question()
        bruteForceRecursive(0,i)

    }

    let dictionary = SpellChecker.getDictionarySync("en-GB");
    let mistakes = 0, lowestMistakes = 10000, bestKey = ""

    for(let solution of possibleSolutions){// Gets the best solution by checking for spelling errors that should exist if the key is wrong
        console.log(solution)
        let arr = solution['result'].split(" ")
            
                mistakes=0
                for(let word of arr){
                var misspelled = ! dictionary.spellCheck(word);
                if(misspelled) {
                    mistakes++;
                }
                }                
                
                if(mistakes < lowestMistakes){
                    lowestMistakes = mistakes;
                    bestKey = solution["keyString"]
                    //console.log(bestKey, bestKey , bestKey)
                }


            
            
        
    }

    console.log("Best key detected with least spelling mistakes for the first 40 characters: \n\n------\n\n", bestKey,"\n\n------\n\n")
    
//




