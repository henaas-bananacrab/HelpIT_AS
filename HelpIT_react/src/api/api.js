const API_BASE_URL = 'http://localhost:3002/api/v1/tickets';

export const getTickets = async () => {
    const res = await fetch(`${API_BASE_URL}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const createTicket = async (ticketData) => {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const updateTicket = async (id, ticketData) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const deleteTicket = async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}