///////////////////////////////////////////////
// Route user.js: /////////////////////////////
///////////////////////////////////////////////

// Logique de routing user ********************

///////////////////////////////////////////////
// Importation :

// Express:
const express = require('express');
// Création du routeur Express:
const router = express.Router();
// Contrôleur user:
const userCtrl = require('../controllers/user');

///////////////////////////////////////////////
// Les routes:

// SIGNUP ************************
router.post('/signup', userCtrl.signup);

// lOGIN *************************
router.post('/login', userCtrl.login);

///////////////////////////////////////////////
// Exporte les routes:
module.exports = router;