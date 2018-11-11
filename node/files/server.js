let  fs = require('fs');
let  join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}
let fileNames=findSync('./');

function getFileContent(fname) {
    // Get File Content by Fs module
    let content = fs.readFileSync(fname, 'utf-8',);
    return content;
}

function outFiles() {
    let fileNames = findSync('./file/');
    for(var i = 0;i<fileNames.length;i++){
        console.log(getFileContent(fileNames[i]));
    }
}

// Output Test Infomation
outFiles();