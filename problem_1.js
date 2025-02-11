let testInput = "    hello world   "

function toPascalCase(str){

    if( str == null || str == undefined){
        return "null"
    }
    let arr =  str.trim().split(" ")
    let res = ""
    for(let word of arr){//capitilize every word
        res+= capitilize(word);
    }

    return res
}


function toCamelCase(str){
    if( str == null || str == undefined){
        return "null"
    }

    let arr =  str.trim().split(" ")
    let res = ""
    for(let i=0 ; i < arr.length ; i++){//capitilize every word except the first one
        if(i!=0){
                    res+= capitilize(arr[i]);

        }else[
            res+= arr[i]

        ]
    }
    
    return res
}

function toSnakeCase(str){

    return kebabAndSnakeHelper(str,"_")
}



function toKebabCase(str){

    return kebabAndSnakeHelper(str,"-")

}

function kebabAndSnakeHelper(str,char){
    if( str == null || str == undefined){
        return "null"
    }

    let arr =  str.trim().split(" ")
    let res = ""
    for(let i=0 ; i < arr.length ; i++){//seperate the word with a dash
        if(i != arr.length-1){
                    res+= arr[i] + char;

        }else{//in case of the last word we don't need to add a dash 
            res+= arr[i];

        }
    }
    
    return res
}


function capitilize(str){

    return str.charAt(0).toUpperCase() + str.slice(1);

}


console.log("pascal case:" , toPascalCase(testInput))
console.log("camel case:" , toCamelCase(testInput))
console.log("snake case:" , toSnakeCase(testInput))
console.log("kebab case:" , toKebabCase(testInput))
