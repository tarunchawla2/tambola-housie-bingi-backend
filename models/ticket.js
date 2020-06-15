const mongoose = require('mongoose');
const Game = require('../models/game')

const ticketSchema = new mongoose.Schema({
    tickets: [],
    username: {
        type: String,
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    }
})

module.exports = mongoose.model('ticket', ticketSchema);