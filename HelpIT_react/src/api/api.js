const API_BASE_URL = 'http://localhost:3002/api/v1/cases';

export const getCases = async () => {
    const res = await fetch(`${API_BASE_URL}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}

export const createCase = async (caseData) => {
    const res = await fetch(API_BASE_URL, {
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

export const updateCase = async (id, caseData) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
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

export const deleteCase = async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return data;
}