const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT|| 7000;
const connectDB = require('./config/database');
const path = require('path');

connectDB();

app.use(express.json());



const routes = require('./routes/routes');

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res)=>{
    res.status(404).send(
    '<div><h1>Looks like you\'ve lost!</h1> <h2>404! Page not found</h2> </div>');
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
