const mongoose = require('mongoose');
const config = require('../config/config');

const connectMongo = () => {
    return mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.dbName)
}
module.exports = connectMongo;