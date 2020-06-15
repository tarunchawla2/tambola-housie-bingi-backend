const Ticket = require('../models/ticket');
const Boom = require('boom');

exports.getTicket = async (request, h) => {
    try {
        const fetchedTicket = await Ticket.findById({ _id: request.params.ticket_id });
        return h.response(fetchedTicket);
    } catch (err) {
        return h(Boom.badImplementation(err))
    }
}

