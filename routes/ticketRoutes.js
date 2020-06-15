const TicketController = require('../controllers/ticketController');

exports.routes = [
    { method: 'GET', path: '/ticket/{ticket_id}', handler: TicketController.getTicket },
]