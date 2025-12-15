import  { useEffect, useState } from 'react'
import { getTickets, getSingleTicket, createTicket, updateTicket, deleteTicket } from '../api/api'
import './support.page.css'

export default function pageV1() {
    const [tickets, setTickets] = useState([]);
    const [singleTicket, setSingleTicket] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [currentStatus, setCurrentStatus] = useState('open');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createMenu, setCreateMenu] = useState(false);
    const [openTicket, setOpenTicket] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    async function fetchTickets() {
        try {
            const resp = await getTickets();
            const ticketsData = resp && resp.data ? resp.data : [];
            setTickets(ticketsData);
            console.log('Fetched tickets:', ticketsData);
        } catch (error) {
            setError(error.message + ' could not fetch tickets');
        }
        setLoading(false);
    }
    
    useEffect(() => {
        fetchTickets();
    }, []);

    async function fetchSingleTicket(id) {
        try {
            const resp = await getSingleTicket(id)
            const ticketData = resp?.data ?? [];
            setSingleTicket([ticketData]);
            console.log('Fetched ticket:', ticketData);
            setOpenTicket(true);
        } catch (error) {
            setError(error.message + ' could not fetch ticket');
        }
    }

    async function handleCreateTicket() {
        if (!newTitle || !newDescription || !currentStatus) return alert('Title and Description are required');
        const ticketData = { 
            title: newTitle,
            description: newDescription,
            status: currentStatus
        };
        try {
            const resp = await createTicket(ticketData);
            const createdTicket = resp && resp.data ? resp.data : resp;
            setTickets(prev => [...prev, createdTicket]);
            setNewTitle('');
            setNewDescription('');
            setCurrentStatus('open');
            setCreateMenu(false);
            console.log('Created ticket:', createdTicket);
        } catch (error) {
            setError(error.message + ' could not create ticket');
        }
    }

    async function handleDeleteTicket(id) {
        try {
            await deleteTicket(id);
            setTickets(prev => prev.filter(c => c.id !== id));
            console.log('Deleted ticket with id:', id);
        } catch (error) {
            setError(error.message + ' could not delete ticket');
        }
    }

    async function handleUpdateTicket(id) {
        if (!newTitle || !newDescription || !currentStatus) return alert('Title and Description are required');
        const ticketData = { 
            title: newTitle,
            description: newDescription,
            status: currentStatus
        };
        try {
            const resp = await updateTicket(id, ticketData);
            const updatedTicket = resp && resp.data ? resp.data : resp;
            setTickets(prev => prev.map(c => c.id === id ? updatedTicket : c));
            setNewTitle('');
            setNewDescription('');
            setCurrentStatus('open');
            setCreateMenu(false);
            setUpdate(false);
            setSelectedTicketId(null)
            console.log('Updated ticket:', updatedTicket);
        } catch (error) {
            setError(error.message + ' could not update ticket');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="support-page">
            <div className="side-menu">
                <div className="app-header"><img/><h1>HelpIT AS</h1></div>
                <nav>
                    <button onClick={() => setCreateMenu(false)}>All Tickets</button>
                    <button onClick={() => setCreateMenu(true)}>Create Ticket</button>
                </nav>
            </div>
            
            {createMenu ? (
                <div className="main-menu">
                    <div className="menu-header"><h1>{update ? 'Update Ticket' : 'Create Ticket'}</h1></div>
                    <div className="menu-content">
                        <div className="ticket-title">
                            <label>What is the problem?
                                <input id="title-input" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            </label>
                        </div>
                        <div className="ticket-description">
                            <label>Describe the issue:
                                <textarea id="description-input" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            </label>
                        </div>
                        <div className="ticket-status">
                            <label>Status:
                                <select id="status-input" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                                    <option value="open">Open</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </label>
                                
                        </div>
                        <button onClick={update ? () => handleUpdateTicket(selectedTicketId) : handleCreateTicket}>{update ? 'Update Ticket' : 'Open Ticket'}</button>
                    </div>
                </div>
            ) : (
                <div className="main-menu">
                    <div className="menu-header"><h1>All Tickets</h1></div>
                    <div className="menu-content">
                        <div className="menu-mini-ticket">
                            <ul>
                                {tickets.map((ticketItem) => (
                                    <li key={ticketItem.id} className="ticket-card" onClick={() =>  fetchSingleTicket(ticketItem.id)}>
                                        <strong className="ticket-title">{ticketItem.title}</strong> <p className="ticket-name">{ticketItem.createdBy}</p> <p className="ticket-date">{ticketItem.date}</p> <p className="ticket-status">({ticketItem.status})</p>
                                        {/*<button onClick={() => { setUpdate(true); setCreateMenu(true); setSelectedTicketId(ticketItem.id)}}>Updated</button>
                                        <button onClick={() => handleDeleteTicket(ticketItem.id)}>Deleted</button>*/}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {openTicket && (
                            singleTicket.map((ticketItem) => (
                            <div key={ticketItem.id} className="ticket">
                                <div className="ticket-date">{ticketItem.date}</div>
                                <div className="ticket-content"></div>
                            </div>
                        ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}