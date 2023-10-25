const dotenv = require('dotenv').config();
const { constants } = require('buffer');
const express = require('express');

const app = express();

const PORT = 8080;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})