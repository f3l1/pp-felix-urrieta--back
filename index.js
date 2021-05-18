
var express = require ('express'); 
var app = express ();
const dotenv = require('dotenv');

let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Importar rutas 
let apiRoutes = require ("./routes/routes")

// get config vars
dotenv.config();

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

//connect to mongoose
const dbPath = 'mongodb://localhost/packAndpack';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected mongodb');
}, error => {
    console.log(error, 'error');
});

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));

//Use API routes in the App
app.use('/api', apiRoutes)

app.listen (process.env.PORT, function () { 
  console.log ('Servirdor corriendo en puerto 3000'); 
});
