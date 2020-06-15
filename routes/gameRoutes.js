const GameController = require('../controllers/gameController');


exports.routes = [
    { method: 'POST', path: '/api/game/create', handler: GameController.createGame },
    {
        method: 'POST', path: '/api/game/{game_id}/ticket/{user_name}/generate',
        handler: GameController.generateTicket
    },
    { method: 'GET', path: '/api/game/{game_id}/number/random', handler: GameController.pickRandomNumber },
    { method: 'GET', path: '/api/game/{game_id}/numbers', handler: GameController.getAllPickedNumbers },
    { method: 'GET', path: '/api/game/{game_id}/stats', handler: GameController.getStats }
]