const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


// TODO: Write DB script
    // Read file to access db.json

    // Write to file to update db.json

    // Translate db data to notes



// TODO: get requests to api/notes for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// TODO: post request for api/notes



// TODO: get * should read db.json



// TODO: BONUS add delete fucntion

app.get("/", function(req,res){
    res.send("boilerplate");
});


app.listen(PORT, function(){
    console.log("Server started on PORT" + PORT);
});