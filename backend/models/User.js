///////////////////////////////////////////////
// Model User.js //////////////////////////////
///////////////////////////////////////////////

// Contient le schéma de données user *********

///////////////////////////////////////////////
// Importation :

// mongoose:
const mongoose = require('mongoose');

// Validation pour pré-valider les informations:
const uniqueValidator = require('mongoose-unique-validator');

///////////////////////////////////////////////
// Schéma:

// User:
const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, "Le champ ne peut etre vide"],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true //
});

///////////////////////////////////////////////
userSchema.plugin(uniqueValidator, {
    message: 'Déja pris'
});

///////////////////////////////////////////////
// Exporte le schéma en tant que modèle Mongoose appelé « User », le rendant par là même disponible pour l'application Express:
module.exports = mongoose.model('User', userSchema);