const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const connect_mongodb = require('./configs/mongodb');
const path = require('path');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình thư mục public
app.use('/public', express.static(path.join(__dirname, '..','public')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// connect mongodb
connect_mongodb();


// Route để bắt đầu quá trình xử lý
app.get('/', async (req, res) => {
    res.send("Hello world");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
