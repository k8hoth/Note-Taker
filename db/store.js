const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor(){
     this.lastId = 0   
    }

read (){
return readFileAsync("db/db.json", "utf8");
}

write(note){
return writeFileAsync("db/db.json", JSON.stringify(note));
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
addNote(note){
    const { title, text } = note;
    if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
      }
      const newNote = { title, text, id: ++this.lastId };

      // Get all notes, add the new note, write all the updated notes, return the newNote
      return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote);
    }
  

removeNote(id){ 
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));


}
}
module.exports = new Store();