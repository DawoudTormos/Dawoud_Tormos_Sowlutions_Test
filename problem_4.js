const readline = require("readline-sync");

const fs = require("fs");

let encryptedMsg = []
data = fs.readFileSync("p059_cipher.txt", { encoding: 'utf8', flag: 'r' });
encryptedMsg = data.split(",")



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




let key=[]

/* 
The below function goes through all possible asccii characters combinations with a string length entered as the second parameter.

First parameter keyIndex is used for recursion and should be always be called with value zero.

With each combination the first 40 characters are XORred with encrypted message and tested for if it looks like a human text

For the absence of a language model for detecting human text, i checked if the text is alphanumeric or conatin symbols (valid characters) and has some spaces (which is the normal for human text)
*/
function bruteForceRecursive(keyIndex , len){
    
    for(let i = 0 ; i < 127 ; i++){
        key[keyIndex] = i
        if(keyIndex == len-1){
            let res = XOR_AsciiWithAscii(encryptedMsg.slice(0,40) , key)
          if(isAlphaNumericOrSymbols(res) && countSpaces(res) > 3){
            console.log(res , key)
        }
        }else{
            bruteForceRecursive(keyIndex+1, len)
        }
    }

}



// main code:

    for(let i = 1 ; i < 10 ; i++){
        console.log("Searching for keys with length: ",i)
        console.log("press enter to start")
        readline.question()
        bruteForceRecursive(0,i)

    }
//



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

