const {getAllObjects, addObject, updateObjectById, deleteObjectById} = require('../data/dataBase');

const getAllCases = async (req, res) => {
    try {
        const cases = await getAllObjects();
        res.status(200).json({success: true, data: cases});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const createCase = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newCase = await addObject({ title, description, status});
        res.status(201).json({success: true, data: newCase});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const updateCase = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updateObject = await updateObjectById(id, { title, description, status });
        res.status(200).json({success: true, data: updateObject});
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

const deleteCase = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await deleteObjectById(id);
        if (isDeleted) {
            res.status(200).json({success: true, message: 'Case deleted successfully'});
        } else {
            res.status(404).json({success: false, error: 'Case not found'});
        }
    } catch (error) {
        res.status(500).json({success: false, error: 'something went wrong'});
    }
};

module.exports = {
    getAllCases,
    createCase,
    updateCase,
    deleteCase
};