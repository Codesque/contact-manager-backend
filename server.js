const express = require('express'); 
const connectDb = require('./config/dbConnection.js');
const errorHandler = require('./middlewares/errorHandler.js');
const dotenv = require('dotenv').config();


connectDb();
const app = express(); 

const port = process.env.PORT || 5000; 

app.use(express.json()); // This is a body parser. That provides us the abilty to capture the data that is coming from the client
app.use('/api/contact', require('./routers/contactRouter.js')); 
app.use('/api/users', require('./routers/userRouters.js'));
app.use(errorHandler);



app.listen(port , () => {
    console.log(`Server is listening on ${port}...`);
})