require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const mainRoute = require('./routes/main')

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());

app.use('/api/v1',mainRoute)

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

try{
    app.listen(port , ()=>{
        console.log(`Server is listening on port ${port}`)
    })
}
catch(err){
    res.send('Cant Start Server');
}