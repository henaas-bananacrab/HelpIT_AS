const express = require('express');

const caseRoutesV1 = require('./v1.0.0/routes/caseRoutes');
//const caseRoutesV2 = require('./v2.0.0/routes/caseRoutes');

const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors());

//Setup Routes | www.localhost:3002/api/v1/cases
app.use('/api/v1/cases', caseRoutesV1);

//Setup Routes | www.localhost:3002/api/v2/cases
//app.use('/api/v2/cases', caseRoutesV2);

app.listen(3002, () => {
    console.log('Server running on port 3002');
})