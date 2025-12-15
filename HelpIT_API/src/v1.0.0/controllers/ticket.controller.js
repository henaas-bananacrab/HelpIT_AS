const {getAllObjects, addObject, updateObjectById, deleteObjectById} = require('../data/ticket.database');

const getAllTickets = async (req, res) => {
    try {
        const tickets = await getAllObjects();
        res.status(200).json({success: true, data: tickets});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const createTicket = async (req, res) => {
    try {
        const { title, assignd, createdBy, phone, priority, status, description } = req.body;
        const newTicket = await addObject({ title, assignd, createdBy, phone, priority, status, description });
        res.status(201).json({success: true, data: newTicket});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, assignd, createdBy, phone, priority, status, description } = req.body;
        const updatedTickets = await updateObjectById(id, { title, assignd, createdBy, phone, priority, status, description });
        res.status(200).json({success: true, data: updatedTickets});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await deleteObjectById(id);
        if (isDeleted) {
            res.status(200).json({success: true, message: 'Ticket deleted successfully'});
        } else {
            res.status(404).json({success: false, error: 'Ticket not found'});
        }
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

module.exports = {
    getAllTickets,
    createTicket,
    updateTicket,
    deleteTicket
};