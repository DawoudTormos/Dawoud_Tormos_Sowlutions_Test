
let encryptedMsg = []
data = fs.readFileSync("p059_cipher.txt", { encoding: 'utf8', flag: 'r' });
encryptedMsg = data.split(",")


function XOR_AsciiWithAscii(data, key) {  
    let result = "";  
      
    for ( let i = 0; i < data.length; i++ ) {  
        result += String.fromCharCode( data[i] ^ key[ i % key.length ]);  
    }  
  
    return result;  
}  


key = [ 101, 120, 112 ] //This code was extracted using the program problem_4.js

let res = XOR_AsciiWithAscii(encryptedMsg , key)
console.log(res)