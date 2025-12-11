import  { useEffect, useState } from 'react'
import { getCases, createCase, updateCase, deleteCase } from '../api/api'

export default function pageV1() {
    const [cases, setCases] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [currentStatus, setCurrentStatus] = useState('open');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createMenu, setCreateMenu] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedCaseId, setSelectedCaseId] = useState(null);

    async function fetchCases() {
        try {
            const resp = await getCases('v1.0.0');
            const casesData = resp && resp.data ? resp.data : [];
            setCases(casesData);
            console.log('Fetched cases:', casesData);
        } catch (error) {
            setError(error.message + ' could not fetch cases');
        }
        setLoading(false);
    }
    
    useEffect(() => {
        fetchCases();
    }, []);

    async function handleCreateCase() {
        if (!newTitle || !newDescription || !currentStatus) return alert('Title and Description are required');
        const caseData = { 
            title: newTitle,
            description: newDescription,
            status: currentStatus
        };
        try {
            const resp = await createCase(caseData);
            const createdCase = resp && resp.data ? resp.data : resp;
            setCases(prev => [...prev, createdCase]);
            setNewTitle('');
            setNewDescription('');
            setCurrentStatus('open');
            setCreateMenu(false);
            console.log('Created case:', createdCase);
        } catch (error) {
            setError(error.message + ' could not create case');
        }
    }

    async function handleDeleteCase(id) {
        try {
            await deleteCase(id);
            setCases(prev => prev.filter(c => c.id !== id));
            console.log('Deleted case with id:', id);
        } catch (error) {
            setError(error.message + ' could not delete case');
        }
    }

    async function handleUpdateCase(id) {
        if (!newTitle || !newDescription || !currentStatus) return alert('Title and Description are required');
        const caseData = { 
            title: newTitle,
            description: newDescription,
            status: currentStatus
        };
        try {
            const resp = await updateCase(id, caseData);
            const updatedCase = resp && resp.data ? resp.data : resp;
            setCases(prev => prev.map(c => c.id === id ? updatedCase : c));
            setNewTitle('');
            setNewDescription('');
            setCurrentStatus('open');
            setCreateMenu(false);
            setUpdate(false);
            setSelectedCaseId(null)
            console.log('Updated case:', updatedCase);
        } catch (error) {
            setError(error.message + ' could not update case');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <>
            <div className="side-menu">
                <div className="app-header"><img/><h1>HelpIT AS</h1></div>
                <nav>
                    <button onClick={() => setCreateMenu(false)}>All Cases</button>
                    <button onClick={() => setCreateMenu(true)}>Create Case</button>
                </nav>
            </div>
            <div className="main-menu">
                {createMenu ? (
                    <div>
                        <div className="menu-header"><h1>{update ? 'Update Case' : 'Create Case'}</h1></div>
                        <div className="menu-content">
                            <div className="case-title">
                                <label>What is the problem?
                                    <input id="title-input" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                </label>
                            </div>
                            <div className="case-description">
                                <label>Describe the issue:
                                    <textarea id="description-input" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                                </label>
                            </div>
                            <div className="case-status">
                                <label>Status:
                                    <select id="status-input" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                                        <option value="open">Open</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </label>
                                
                            </div>
                            <button onClick={update ? () => handleUpdateCase(selectedCaseId) : handleCreateCase}>{update ? 'Update Case' : 'Open Case'}</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="menu-header"><h1>All Cases</h1></div>
                        <div className="menu-content">
                            <ul>
                                {cases.map((caseItem) => (
                                    <li key={caseItem.id} className="case-card">
                                        <strong>{caseItem.title}</strong> Description: {caseItem.description} (Status: {caseItem.status})
                                        <button onClick={() => { setUpdate(true); setCreateMenu(true); setSelectedCaseId(caseItem.id)}}>Updated</button>
                                        <button onClick={() => handleDeleteCase(caseItem.id)}>Deleted</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}