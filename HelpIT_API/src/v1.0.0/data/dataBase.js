let cases = [
    { id: 1, title: 'Network Issue', description: 'Cannot connect to VPN', status: 'Open' },
    { id: 2, title: 'Software Bug', description: 'Application crashes on launch', status: 'In Progress' },
    { id: 3, title: 'Hardware Failure', description: 'Laptop not powering on', status: 'Resolved' },
];

// get all cases
const getAllObjects = () => {
    return [...cases];
}

// add case
const addObject = (caseObject) => {
    const id = cases.length ? cases[cases.length - 1].id + 1 : 1;
    const newCaseObject = { id, ...caseObject };
    cases.push(newCaseObject);
    return newCaseObject;
}

// update case by id
const updateObjectById = (id, updatedCase) => {
    id = parseInt(id);
    if (isNaN(id)) return false;

    // makes index = id of object | check if id/object exists | if it dose not exist, update it
    const index = cases.findIndex((cases) => cases.id === id);
    if (index !== -1) {
        cases[index] = { ...cases[index], ...updatedCase };
        return cases[index];
    }
    return null;
}

// delete case by id
const deleteObjectById = (id) => {
    id = parseInt(id);
    if (isNaN(id)) return false;

    // makes index = id of case
    const index = cases.findIndex((cases) => cases.id === id);

    //checks if index is not -1/does not exist | if it dose not exist , delete it by splicing. Splicing removes the element at the specified index
    if (index !== -1) {
        cases.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    getAllObjects,
    addObject,
    updateObjectById,
    deleteObjectById
}