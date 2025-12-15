const express = require('express');

const { getAllTickets, getSingleTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticket.controller');

const router = express.Router();

//GET | www.localhost:3002/api/v1/tickets
router.get('/', getAllTickets);

//GET | www.localhost:3002/api/v1/tickets/???(id-en til saken)
router.get('/:id', getSingleTicket)

//POST | www.localhost:3002/api/v1/tickets
router.post('/', createTicket);

//PUT | www.localhost:3002/api/v1/tickets/???(id-en til saken)
router.put('/:id', updateTicket);

//DELETE | www.localhost:3002/api/v1/tickets/???(id-en til saken)
router.delete('/:id', deleteTicket);

module.exports = router;