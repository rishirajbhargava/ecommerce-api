const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT|| 7000;
const connectDB = require('./config/database');
const Product = require('./models/Product');
const data = require('./data');


connectDB();

app.use(express.json());



const routes = require('./routes/routes');

app.use('/api', routes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
