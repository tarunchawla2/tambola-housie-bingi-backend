const mongoose = require('mongoose');
const Game = require('../models/game');
const Ticket = require('../models/ticket');
const Boom = require('boom');

exports.createGame = async (request, h) => {
    const game = new Game({});
    try {
        await game.save();
        return h.response({ gameId: game._id }).code(201);
    }
    catch (err) {
        return h(Boom.badImplementation(err))
    }
}

exports.generateTicket = async (request, h) => {
    try {

        getRandomNumber = function () {
            var index = Math.floor(Math.random() * (numbersArray.length - 0) + 0);;
            var value = numbersArray[index];
            return value;
        }

        getIndices = function (ticket, value) {
            var column = Math.ceil((value / 10) - 1);
            var indices = [];
            for (var row = 0; row < 3; row++) {
                if (ticket[row][column] == 0 && ticket[row].filter(function (n) { return n != 0; }).length < 5) {
                    indices = [0, 0];
                    indices[0] = row;
                    indices[1] = column;
                }
            }
            return indices;
        }

        sortColumns = function (ticket) {
            for (var col = 0; col < 9; col++) {
                if (ticket[0][col] != 0 && ticket[1][col] != 0 && ticket[2][col] != 0) {
                    var newArray = [];
                    newArray.push(ticket[0][col]);
                    newArray.push(ticket[1][col]);
                    newArray.push(ticket[2][col]);
                    console.log('before sort array ', newArray)
                    newArray.sort((a, b) => a - b);
                    console.log('sorted array ', newArray)
                    ticket[0][col] = newArray[0];
                    ticket[1][col] = newArray[1];
                    ticket[2][col] = newArray[2];
                }
                else if (ticket[0][col] != 0 && ticket[1][col] != 0 && ticket[2][col] == 0) {
                    if (ticket[0][col] > ticket[1][col]) {
                        var temp = ticket[0][col];
                        ticket[0][col] = ticket[1][col];
                        ticket[1][col] = temp;
                    }
                }
                else if (ticket[0][col] != 0 && ticket[1][col] == 0 && ticket[2][col] != 0) {
                    if (ticket[0][col] > ticket[2][col]) {
                        var temp = ticket[0][col];
                        ticket[0][col] = ticket[2][col];
                        ticket[2][col] = temp;
                    }
                }
                else if (ticket[0][col] == 0 && ticket[1][col] != 0 && ticket[2][col] != 0) {
                    if (ticket[1][col] > ticket[2][col]) {
                        var temp = ticket[1][col];
                        ticket[1][col] = ticket[2][col];
                        ticket[2][col] = temp;
                    }
                }
            }
            return ticket;
        }

        prepareTicket = function () {
            numbersArray = [];
            for (var a = 1; a <= 90; a++) {
                numbersArray.push(a)
            }
            var ticket = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
            for (var j = 1; j <= 15; j++) {
                var randomNumber = getRandomNumber();
                var indices = getIndices(ticket, randomNumber);
                if (indices.length) {
                    ticket[indices[0]][indices[1]] = randomNumber;
                } else {
                    j--;
                }
            }
            ticket = sortColumns(ticket);
            return ticket;
        }
        finalTicket = prepareTicket()
        console.log('get tickets ', finalTicket)

        const ticket = new Ticket({
            tickets: finalTicket,
            username: request.params.user_name,
            gameId: request.params.game_id
        })

        await ticket.save();
        await Game.findOneAndUpdate({ _id: request.params.game_id },
            { $push: { ticketsId: ticket._id } }, { new: true });

        return h.response({ ticketId: ticket._id }).code(200);
    } catch (err) {
        return h(Boom.badImplementation(err))
    }
}

exports.pickRandomNumber = async (request, h) => {
    try {
        const randomNumber = Math.floor(Math.random() * (90 - 0) + 0);
        await Game.findOneAndUpdate({ _id: request.params.game_id }, { $push: { pickedNumbers: randomNumber } }, { new: true })
        return h.response({ randomNumber: randomNumber }).code(200);
    } catch (err) {
       return h(Boom.badImplementation(err))
    }
}

exports.getAllPickedNumbers = async (request, h) => {
    try {
        const pickedNumbers = await Game.findOne({ _id: request.params.game_id })
            .select('pickedNumbers');
        return h.response(pickedNumbers).code(200);
    } catch (err) {
        return  h(Boom.badImplementation(err))
    }
}
exports.getStats = async (request, h) => {
    try {
        const game = await Game.findOne({ _id: request.params.game_id })
        //.populate('ticketsId');
        const responseObj = {
            pickedNumbers: game.pickedNumbers,
            noOfTickets: game.ticketsId.length,
            noOfUsers: game.ticketsId.length
        }
        return h.response(responseObj).code(200);
    } catch (err) {
        console.log('error ', err)
        return  h(Boom.badImplementation(err))
    }
}