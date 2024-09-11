const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const connect_mongodb = require('./configs/mongodb');
const { get_database_yu_gi_oh, processDocumentsInBatches } = require('./services/get-database-yu-gi-oh');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect mongodb
connect_mongodb();


// Route để bắt đầu quá trình xử lý
app.get('/', async (req, res) => {
    try {
        // await get_database_yu_gi_oh();
        await processDocumentsInBatches();
        res.send('Save images successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
