const express = require('express');
const fs = requre('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", function(req,res){
    res.send("boilerplate");
});


app.listen(PORT, function(){
    console.log("Server started on PORT" + PORT);
});