///////////////////////////////////////////////
// server.js //////////////////////////////////
///////////////////////////////////////////////

// Contient le serveur ************************

///////////////////////////////////////////////
// Importation :

// Package http de node:
const http = require('http')
// L'application:
const app = require('./app')

///////////////////////////////////////////////
// Options:

// consola:
const {
    success,
    error
} = require('consola')

///////////////////////////////////////////////
// Mise en place du serveur:

// *******************************************/
// Envoie un port valide fourni sous forme de numéro ou de chaîne:
const normalizePort = (val) => {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

// *******************************************/
// Récupére le port:
const port = normalizePort(process.env.PORT || '3000')

// *******************************************/
// Définit sur quel port s'exécuté:
app.set('port', port)

// *******************************************/
// Recherche et gère les erreurs pour ensuite les enregistrées dans le serveur:
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1)
            break
        default:
            throw error
    }
}

// *******************************************/
// Server:

// Création:
const server = http.createServer(app);

// Lance le serveur et gére les erreurs si elles existent:
server.on('error', errorHandler);

server.on('listening', () => {
    // L'écouteur d'évènements consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console:
    const address = server.address()
    const bind = typeof address === 'string' ?
        'pipe ' + address :
        'port ' + port
    success({
        message: ' Running at http://localhost:' + port,
        badge: true
    })
})

// *******************************************/
// Exécute le port définit en amont:
server.listen(port)