///////////////////////////////////////////////
// Controller object.js ///////////////////////
///////////////////////////////////////////////

// Logique globale de object ******************

///////////////////////////////////////////////
// Importation :

//  models user:
const Book = require("../models/Book");
// dotEnv :
const dotEnv = require('dotenv').config()

///////////////////////////////////////////////
// CRUD:

// *******************************
// Création:

exports.createBook = (req, res, next) => {

    const objectBook = req.body

    const book = new Book({
        ...objectBook,
        userId: req.body.userId
    })

    book
        .save()
        .then(() =>
            res.status(201).json({
                idUser: book.userId,
                idBook: book.id,
                message: "Livre créé !"
            })
        )
        .catch(err =>
            res.status(400).json({
                err
            })
        )

}

// *******************************
// Affiche tous les books:

exports.getAllBook = (req, res, next) => {

    Book
        .find()
        .then(book => {
            res.status(200).json(book);
        })
        .catch(err =>
            res.status(400).json({
                err
            })
        )

}

// *******************************
// Affiche un book:

exports.getOneBook = (req, res, next) => {

    Book
        .findOne({
            _id: req.params.id,
        })
        .then((book) => {
            res.status(200).json(book);
        })
        .catch(err =>
            res.status(404).json({
                err
            })
        )
}

// *******************************
// Modification du book:

exports.updateBook = (req, res, next) => {

    Book
        .updateOne({
            _id: req.params.id,
        }, {
            ...req.body,
            _id: req.params.id,
        })
        .then(() =>
            res.status(200).json({
                idUser: req.body.userId,
                idBook: req.params.id,
                message: "Votre livre a correctement été mis à jour !",
            })
        )
        .catch(err =>
            res.status(400).json({
                err
            })
        )

}

// *******************************
// Suppression du book:

exports.deleteBook = (req, res, next) => {

    Book
        .deleteOne({
            _id: req.params.id,
        })
        .then(() =>
            res.status(200).json({
                message: "Votre livre a correctement été supprimé !",
            })
        )
        .catch(err =>
            res.status(400).json({
                err
            })
        )
}
