const express = require('express');

const ticketsRouter = require('./v1.0.0/routes/ticket.routes');

const app = express();
const cors = require('cors');

//Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // React app origin
}));

//Setup Routes | www.localhost:3002/api/v1/tickets
app.use('/api/v1/tickets', ticketsRouter);

app.listen(3002, () => {
    console.log('Server running on port 3002');
})