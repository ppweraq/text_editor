const {contextBridge} = require('electron');
const path = require('path');
const fs = require('fs');

const getFilePath = (filename) => path.join(__dirname, 'files', filename)


contextBridge.exposeInMainWorld('electron', {
    getFileNames: () => {
        let files = fs.readdirSync(path.join(__dirname, 'files'))
        .map(fileName => fileName)
        return files.join('\n');
    },
    readFile: (filename) => {
        let fileText = fs.readFileSync(getFilePath(filename), 'utf8')
        return fileText;
    },
    createFile: (filename) => {
        let fileTitle = getFilePath(filename)
        fs.writeFileSync(`${fileTitle}.txt`, '')
    }, 
    writeFile: (filename, fileText) => {
        fs.writeFileSync(getFilePath(filename), fileText)
    },
    deleteFile: (filename) => fs.unlinkSync(getFilePath(filename))
})