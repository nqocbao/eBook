const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Kết nối DB

const database = require('./config/database');
database.connect();


// Khởi tạo app
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

//Body-Parser
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Routes (sẽ thêm sau)
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
