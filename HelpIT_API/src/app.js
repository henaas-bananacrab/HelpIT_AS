const express = require('express');

const caseRoutes = require('./v1.0.0/routes/caseRoutes');

const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors());

//Setup Routes | www.localhost:3002/api/v1/cases
app.use('/api/v1/cases', caseRoutes);

app.listen(3002, () => {
    console.log('Server running on port 3002');
})