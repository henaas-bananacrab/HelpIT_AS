const express = require('express');

const apiVersionMiddleware = require('./middleware/api_version');
const casesRouter = require('./v1.0.0/routes/caseRoutes');

const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // React app origin
}));

//Setup Routes | www.localhost:3002/api/cases
app.use('/api', apiVersionMiddleware);
app.use('/api/cases', casesRouter);

app.listen(3002, () => {
    console.log('Server running on port 3002');
})