const API_BASE_URL = 'http://localhost:3002/api';

export const getCases = async (version) => {
    const res = await fetch(`${API_BASE_URL}/cases`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const createCase = async (version, caseData) => {
    const res = await fetch(`${API_BASE_URL}/cases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caseData),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const updateCase = async (version, caseId, caseData) => {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(caseData),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const deleteCase = async (version, caseId) => {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}