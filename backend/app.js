///////////////////////////////////////////////
// app.js /////////////////////////////////////
///////////////////////////////////////////////

// Contient l'application *********************

///////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express');

// Helmet:
const helmet = require('helmet');

// Morgan:
const morgan = require('morgan')

// dotEnv:
const dotEnv = require('dotenv').config()

// Body-parser:
const bodyParser = require('body-parser')

// MongoDb:
const dbConnect = require('./config/db-config');

// Path:
const path = require("path");

///////////////////////////////////////////////
// Importe les routeur:


///////////////////////////////////////////////
// Instance de l'objet express :
const app = express();

///////////////////////////////////////////////
// Monte les fonctions:

// Sécuriser l'app Express en définissant divers en-têtes HTTP:
app.use(helmet());

// Log les requêtes et les réponses:
app.use(morgan('dev'));

///////////////////////////////////////////////
// Ajoute des headers pour permettre l'accées à l'api:

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
})

///////////////////////////////////////////////
// Appelée à chaque requête envoyée au serveur:

app.use(bodyParser.json());

///////////////////////////////////////////////
// Enregistrer les routeur:

// *******************************************/
// 

///////////////////////////////////////////////
// Exportation:
module.exports = app;