/*
This part of problem 4 decrypts the whole message using the key extracted from part 1
*/

//importing the node modules needed
const fs = require("fs");//for reading the file

//loading the file of the encrypted message
let encryptedMsg = []
data = fs.readFileSync("p059_cipher.txt", { encoding: 'utf8', flag: 'r' });
encryptedMsg = data.split(",")



//XORing function for decryption
function XOR_AsciiWithAscii(data, key) {  
    let result = "";  
      
    for ( let i = 0; i < data.length; i++ ) {  
        result += String.fromCharCode( data[i] ^ key[ i % key.length ]);  
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



//decrypting the whole message

key = [ 101, 120, 112 ] //This key was extracted using the program problem_4.js
keyString = 'exp'//Same key but as a text format


let res = XOR_AsciiWithAscii(encryptedMsg , key)
console.log(res, "\n\n-----------\n\n")

 res = XOR_AsciiWithString(encryptedMsg , keyString)
console.log(res)