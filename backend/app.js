const express = require('express');
const app = express();
const route = require('./routes/transaction');
const errorMiddelWare = require('./middleware/error');
const path = require('path');

app.use(express.json());

app.use('/api',route);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    })
}


app.use(errorMiddelWare);

module.exports = app;