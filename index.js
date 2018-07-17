const express=require("express");
const bodyParser=require("body-parser");


const app=express();

app.use(express.static('public'));
app.use(bodyParser.json());

const routes=require('./routes/routes')(app);


app.listen(1500);
