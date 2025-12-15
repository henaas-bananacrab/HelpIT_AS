let tickets = [
    { id: 1, title: 'Network Issue', assignd: 'Tor', date: '12.12.2025', createdBy: 'Råger Råland', phone: 47566070, priority: 'low', status: 'Open', description: 'Cannot connect to VPN',  },
    { id: 2, title: 'Software Bug', assignd: 'Tor', date: '13.12.2025', createdBy: 'Råger Råland', phone: 47566070, priority: 'low', status: 'Open', description: 'Application crashes on launch',  },
    { id: 2, title: 'Hardware Failure', assignd: 'Gyda', date: '14.12.2025', createdBy: 'Råger Råland', phone: 47566070, priority: 'high', status: 'Open', description: 'Laptop not powering on',  }
];

// get all tickets
const getAllObjects = () => {
    return [...tickets];
}

// get single ticket by id
const getObjectById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return null;
    return tickets.find((ticket) => ticket.id === id);
}

// add ticket
const addObject = (ticket) => {
    const id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = `${month}.${day}.${year}`;
    const newTicket = { id, date, ...ticket };
    tickets.push(newTicket);
    return newTicket;
}

// update ticket by id
const updateObjectById = (id, updatedTicket) => {
    id = parseInt(id);
    if (isNaN(id)) return false;

    // makes index = id of object | check if id/object exists | if it dose not exist, update it
    const index = tickets.findIndex((tickets) => tickets.id === id);
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...updatedTicket };
        return tickets[index];
    }
    return null;
}

// delete ticket by id
const deleteObjectById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return false;

    // makes index = id of ticket
    const index = tickets.findIndex((tickets) => tickets.id === id);

    //checks if index is not -1/does not exist | if it dose not exist , delete it by splicing. Splicing removes the element at the specified index
    if (index !== -1) {
        tickets.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    getAllObjects,
    getObjectById,
    addObject,
    updateObjectById,
    deleteObjectById
}