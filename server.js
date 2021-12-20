const express = require('express');
const fs = require('fs');
const {
    add
} = require('nodemon/lib/rules');
const path = require('path');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Write DB scripts
// Read file to access db.json
readDb = () => {
    return readFileAsync("./db/db.json", "utf8").then(data => JSON.parse(data))
        .catch(function (err) {
            console.log(err);
        });
}

// Write to file to update db.json
writetoFile = notes => {
    writeFileAsync("./db/db.json", JSON.stringify(notes))
        .then(() => console.log("wrote to db.json"))
        .catch(function (err) {
            console.log(err);
        });
};

// Function to add id to array so html will display note on click 
// starts with 1, not 0 like array, so +1 needed
addId = (array) => {
    for (let i = 0; i < array.length; i++) {
        array[i].id = i + 1;
    }
    return array
}



// get requests to api/notes for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", async (req, res) => {
    // get data from db, then set it equal to notesArr (async?)
    const notesArr = await readDb();
    res.json(notesArr)
});

// TODO: post request for api/notes
app.post("/api/notes", async (req, res) => {
    const notesArr = await readDb();

    const newNote = req.body;
    notesArr.push(newNote);

    // After push, need to add "id" to json
    addId(notesArr);

    writetoFile(notesArr);
    return res.json(newNote);

});


// TODO: BONUS add delete fucntion
app.delete("/api/notes/:id", async (req, res) => {
    const noteArr = await readDb();
    const deletedId = req.params.id;

    for (let i = 0; i < noteArr.length; i++) {
        if (deletedId == noteArr[i].id) {
            // pop wont work?
            noteArr.splice(i, 1);
        };
    };
    writetoFile(noteArr);
    res.send(200);
});


//get * to load initial html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("Server started on PORT" + PORT);
});