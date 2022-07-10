///////////////////////////////////////////////
// connexion.js ///////////////////////////////
///////////////////////////////////////////////

// Contient la connexion à la bdd *************

///////////////////////////////////////////////
// Importation :

// Mongoose:
const mongoose = require("mongoose");

// dotEnv :
const dotEnv = require('dotenv').config();

///////////////////////////////////////////////
// Options:

// Debug mongoose:
mongoose.set('debug', true);

// consola:
const {
    success,
    error
} = require('consola')

///////////////////////////////////////////////
// Connexions à la bdd:

const user      = process.env.USERDB;
const password  = process.env.PASSWORDDB;
const idCluster = process.env.IDCLUSTERDB;
const nameDB    = process.env.NAMEDB;

const dbConnect = mongoose
    .connect(
        "mongodb+srv://" +
        user +
        ":" +
        password +
        "@" +
        idCluster +
        ".mongodb.net/" +
        nameDB +
        "?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() =>
        success({
            message: ' Connexion à MongoDB réussie ! ',
            badge: true
        }))
    .catch(err =>
        error({
            message: ' Connexion à MongoDB échouée ! \n' + err,
            badge: true
        }))

///////////////////////////////////////////////
// Exportation:
module.exports = dbConnect;