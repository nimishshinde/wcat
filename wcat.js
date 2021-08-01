let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let commandArr = [];
let filePathArr = [];
let bool = false;

for(let i=0; i<inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        commandArr.push(inputArr[i]);
    }else{
        filePathArr.push(inputArr[i]);
    }
}

for(let i=0; i<filePathArr.length; i++){
    console.log(filePathArr[i]);
    let ans = fs.existsSync(filePathArr[i]);
    if(ans == false){
        console.log("File Doesn't Exist");
        return;
    }
}

let content = "";
for(let i=0; i<filePathArr.length; i++){
    let cFileContent = fs.readFileSync(filePathArr[i]);
    content = content + cFileContent + "\r\n";
}
let contentArr = content.split("\r\n");

let isSPresent = commandArr.includes("-s");
if(isSPresent){
    for(let i=1; i<contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    console.log(tempArr.join("\r\n"));
}

// the -n command which will give numbering to all the lines...
let isNPresent = commandArr.includes("-n");
if(isNPresent && bool == false){
    for(let i=0; i<contentArr.length; i++){
        let str = "";
        contentArr[i] = str + i + contentArr[i];
    }
    console.log(contentArr.join("\n\r"));
    bool = true;
}

// -b command 
let isBPresent = commandArr.includes("-b");
let count = 0;
if(isBPresent && bool == false){
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != ""){
            count = count + 1;
            let str = "";
            contentArr[i] = str + count + contentArr[i];
        }
    }
    console.log(contentArr.join("\n\r"));
    bool = false;
}



// console.log(content);

// for(let i=0; i<commandArr.length; i++){
//     let ch = commandArr[i];
//     let filePath = filePathArr[i];
//     switch(ch){
//         case "-s":
//             convertBigLineIntoSingleLine(filePath);
//             break;
//     }
// }

// function convertBigLineIntoSingleLine(path){
//     let content = fs.readFileSync(path);
//     let strArr = content.split("\n\r");
//     console.log(strArr);
// }
