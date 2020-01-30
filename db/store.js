const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyc = util.promisify(fs.writeFile);

class Store {
    constructor(){
     this.lastId = 0   
    }

read (){
return readFileAsync("db/db.json", "utf8");
}

write(){

}

    getNotes(){
        return this.read()
            .then(notes => {
                let parsedNotes;

                try {
                    parsedNotes = [].concat(JSON.parse(notes));
                } catch (error) {
                    parsedNotes = [];
                    
                }
                return parsedNotes; 
            })
            .catch(err => console.log(err));
    }
addNote(){

}
removeNote(){

}
}
module.exports = new Store();