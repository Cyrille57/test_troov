///////////////////////////////////////////////
// Controller user.js /////////////////////////
///////////////////////////////////////////////

// Logique globale de user ********************

///////////////////////////////////////////////
// Importation :

// dotEnv :
const dotEnv = require('dotenv').config()
// bcrypt:
const bcrypt = require("bcrypt");
// crypto-js:
const cryptojs = require("crypto-js");
// jsonwebtoken:
const jwt = require("jsonwebtoken");
// models user:
const User = require("../models/User");

//////////////////////////////////////////////
// Regex:
const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
/**
 * Contient au moins une lettre minuscule ( ?=.*[a-z]), une lettre majuscule ( ?=.*[A-Z]),
 * un chiffre ( ?=.*[0-9]), un caractère spécial ( ?=.*[^A-Za-z0-9]) et
 * au moins huit caractères ( ?=.{8,}):
 */

//////////////////////////////////////////////
// Variables:
var cryptoKeyMail = process.env.CRYPTOJS_MAIL

//////////////////////////////////////////////
// Fonction pour inscrire un user:
exports.signup = (req, res, next) => {
    // *******************************
    // Variables:
    var email = req.body.email
    var password = req.body.password

    // *******************************
    // Utilisation des regex :
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Email ou password non valide!"
        })
    } else {
        // *******************************
        // Crypte l'email:
        var emailCryptoJs = cryptojs
            .HmacSHA256(
                email, cryptoKeyMail
            )
            .toString()
        // *******************************
        // Implémente la fonction de hachage de bcrypt:
        bcrypt
            .hash(password, 10)
            .then((hash) => {
                const user = new User({
                    email: emailCryptoJs,
                    password: hash,
                });
                // *******************************
                // Enregistre l'user:
                user
                    .save()
                    .then(() =>
                        res
                        .status(201)
                        .json({
                            idUser: user._id,
                            email: emailCryptoJs,
                            message: " Utilisateur créé ! "
                        })
                    )
                    .catch((error) =>
                        res
                        .status(500).json({
                            error
                        })
                    );
            })
            .catch((error) =>
                res
                .status(500).json({
                    error,
                })
            );
    }
};

//////////////////////////////////////////////
// Fonction pour connecter un user:
exports.login = (req, res, next) => {

    ///////////////////////////////////////////////
    // Utilisation des regex :
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            'error': "L'email n'est pas valide !"
        })
    }

    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({
            'error': " Mot de passe invalide ! Doit contenir une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial et au moins huit caractères!"
        })
    }

    ///////////////////////////////////////////////
    // Récupére et crypte l'email:
    var emailCryptoJs = cryptojs
        .HmacSHA256(
            req.body.email, cryptoKeyMail
        )
        .toString()

    ///////////////////////////////////////////////
    //  Vérifie si l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données:
    User.findOne({
            email: emailCryptoJs
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur inexistant'
                });
            }

            ///////////////////////////////////////////////
            // bcrypt.compare le mdp entré par l'utilisateur avec le hash enregistré dans la base de données:
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        idUser: user._id,
                        token: jwt.sign({
                                userId: user._id
                            },
                            (process.env.tokenLogInUser), {
                                expiresIn: '24h'
                            }
                        ),
                        message: "Utilisateur connecté !"
                    });
                })
                .catch((error) =>
                    res.status(500).json({
                        error
                    })
                );
        })
        .catch((error) =>
            res.status(500).json({
                error
            })
        );

};