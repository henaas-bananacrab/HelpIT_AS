const express = require('express');

const { getAllCases, createCase, updateCase, deleteCase } = require('../controllers/caseController');

const router = express.Router();

//GET | www.localhost:3002/api/v1/cases
router.get('/', getAllCases);

//POST | www.localhost:3002/api/v1/cases
router.post('/', createCase);

//PUT | www.localhost:3002/api/v1/cases/???(id-en til saken)
router.put('/:id', updateCase);

//DELETE | www.localhost:3002/api/v1/cases/???(id-en til saken)
router.delete('/:id', deleteCase);

module.exports = router;