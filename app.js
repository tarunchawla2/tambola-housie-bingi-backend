const hapi = require('hapi');
const connectMongo = require('./util/mongo');
const config = require('./config/config');
const gameRoutes = require('./routes/gameRoutes');
const ticketRoutes = require('./routes/ticketRoutes')


const server = new hapi.Server({
    host: config.server.host,
    port: config.server.port
});

const bootUpServer = async () => {
    server.route(gameRoutes.routes);
    server.route(ticketRoutes.routes)

    await server.start();
    console.log(`Server is running at ${server.info.uri}`);

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

connectMongo().then(() => {
    console.log('Connected to Mongo');
    bootUpServer();
})


