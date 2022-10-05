const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const routes = require('./routes/posts')
require('dotenv').config();
app.use(express.static('./client/public'))
app.use(express.json());

app.use('/api/v1/posts', routes)
const PORT = process.env.PORT || 5000;
const options = {
    key: fs.readFileSync('../client/cert/localhost-key.pem'),
    cert: fs.readFileSync('../client/cert/localhost.pem')

}

const startApp = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        https.createServer(options, app).listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
    }
    catch (err) {
        console.error(err);
    }
}

startApp();
