const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const connect_mongodb = require('./configs/mongodb');
const path = require('path');
const http = require('http');
const socket_server = require('./socket.io');


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

// socket server
const server = http.createServer(app);
const io = socket_server(server);


// Route để bắt đầu quá trình xử lý
app.get('/', async (req, res) => {
    res.send("Hello world");
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
