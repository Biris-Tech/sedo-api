require('dotenv').config();
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const express = require('express');
const swagger = require('./swagger');
const router = express.Router();
const twilio = require('twilio');
const cors = require('cors');
const app = express();
swagger(app);
const port = 8000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};


app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client')));

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const proposalRoutes = require("./routes/proposal");
const addressRoutes = require("./routes/address");
const roleRoutes = require("./routes/role");
const transactionRoutes = require("./routes/transaction");
const transportRoutes = require("./routes/transport");
const userRoutes = require("./routes/user");

// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", transportRoutes);
app.use("/", roleRoutes);
app.use("/", addressRoutes);
app.use("/", proposalRoutes);
app.use("/", orderRoutes);
app.use("/", transactionRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
