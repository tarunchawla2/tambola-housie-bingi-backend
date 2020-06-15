const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

const gameSchema = new mongoose.Schema({
    ticketsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket'
    }],
    pickedNumbers: []
})
module.exports = mongoose.model('game', gameSchema)