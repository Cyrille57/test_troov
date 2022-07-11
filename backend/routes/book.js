///////////////////////////////////////////////
// Route book.js: /////////////////////////////
///////////////////////////////////////////////

// Logique de routing book ********************

///////////////////////////////////////////////
// Importation :

// Express:
const express = require('express');
// Création du routeur Express:
const router = express.Router();
// Middleware d'authentification:
const auth = require('../middleware/auth');
// Contrôleur user:
const bookCtrl = require('../controllers/book');

///////////////////////////////////////////////
// Les routes:

// *******************************
// Création:
router.post('/', auth, bookCtrl.createBook);

// *******************************
// Affiche tout les books
router.get('/', bookCtrl.getAllBook);

// *******************************
// Affiche un seul book:
router.get('/:id', bookCtrl.getOneBook);

// *******************************
// Modification du book:
router.put('/:id', auth, bookCtrl.updateBook);

// *******************************
// Suppression du book:
router.delete('/:id', auth, bookCtrl.deleteBook);

///////////////////////////////////////////////
// Exporte les routes:
module.exports = router;