const express = require('express');

const casesRouter = require('./v1.0.0/routes/caseRoutes');

const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // React app origin
}));

//Setup Routes | www.localhost:3002/api/v1/cases
app.use('/api/v1/cases', casesRouter);

app.listen(3002, () => {
    console.log('Server running on port 3002');
})