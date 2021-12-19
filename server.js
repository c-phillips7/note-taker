const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// TODO: Write DB script
    // Read file to access db.json
    readDb = () => {
        return readFileAsync('./dc/db.json', 'utf8').then(data => JSON.parse(data))
            .catch(function (err) {
                console.log(err);
            });
    }

    // Write to file to update db.json

    // Translate db data to notes



// TODO: get requests to api/notes for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get('/api/notes', async (req, res) => {
    // get data from db, then set it equal to notesArr (async?)
    const dbData = await readDb();
    const notesArr = dbData
    res.json(notesArr)
});

// TODO: post request for api/notes



//get * to load initial html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));



// TODO: BONUS add delete fucntion



app.listen(PORT, function(){
    console.log("Server started on PORT" + PORT);
});