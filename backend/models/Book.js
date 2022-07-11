///////////////////////////////////////////////
// Model Book.js //////////////////////////////
///////////////////////////////////////////////

// Contient le schéma de données book *********

///////////////////////////////////////////////
// Importation :

// mongoose:
const mongoose = require('mongoose');

///////////////////////////////////////////////
// Schéma:

// Book:
const bookSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: String,
    categories: String,
    abstract: String

});

///////////////////////////////////////////////
// Exportation:
module.exports = mongoose.model('book', bookSchema);