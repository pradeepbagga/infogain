const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Database Connected. ");
    });
    mongoose.connection.on("error", (err) => {
        console.log("Database ERROR - ", err);
    });
}
 
module.exports = connectDB;