const {getAllObjects, addObject, updateObjectById, deleteObjectById} = require('../data/dataBase');

const getAllCases = async (req, res) => {
    try {
        const cases = await getAllObjects();
        res.status(200).json({success: true, apiVersion: res.locals.apiVersion, data: cases});
    } catch (error) {
        res.status(500).json({success: false, apiVersion: res.locals.apiVersion, error: 'something went wrong'});
    }
};

const createCase = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newCase = await addObject({ title, description, status});
        res.status(201).json({success: true, apiVersion: res.locals.apiVersion, data: newCase});
    } catch (error) {
        res.status(500).json({success: false, apiVersion: res.locals.apiVersion, error: 'something went wrong'});
    }
};

const updateCase = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updateObject = await updateObjectById(id, { title, description, status });
        res.status(200).json({success: true, apiVersion: res.locals.apiVersion, data: updateObject});
    } catch (error) {
        res.status(500).json({success: false, apiVersion: res.locals.apiVersion, error: 'something went wrong'});
    }
};

const deleteCase = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await deleteObjectById(id);
        if (isDeleted) {
            res.status(200).json({success: true, apiVersion: res.locals.apiVersion, message: 'Case deleted successfully'});
        } else {
            res.status(404).json({success: false, apiVersion: res.locals.apiVersion, error: 'Case not found'});
        }
    } catch (error) {
        res.status(500).json({success: false, apiVersion: res.locals.apiVersion, error: 'something went wrong'});
    }
};

module.exports = {
    getAllCases,
    createCase,
    updateCase,
    deleteCase
};