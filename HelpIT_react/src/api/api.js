import axios from 'axios';

export const getCases = async (version) => {
    const response = await axios.get(`http://localhost:3002/api/${version}/cases`);
    return response.data;
}

export const createCase = async (version, caseData) => {
    const response = await axios.post(`http://localhost:3002/api/${version}/cases`, caseData);
    return response.data;
}

export const updateCase = async (version, caseId, caseData) => {
    const response = await axios.put(`http://localhost:3002/api/${version}/cases/${caseId}`, caseData);
    return response.data;
}

export const deleteCase = async (version, caseId) => {
    const response = await axios.delete(`http://localhost:3002/api/${version}/cases/${caseId}`);
    return response.data;
}