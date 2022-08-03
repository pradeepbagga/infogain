const app = require('./app');
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV !== "production") { 
    require('dotenv').config({ path: './backend/config/config.env'});
}

const db = require('./config/db');
db();


app.listen(port, () => {
    console.log("Server is running on port: ", process.env.PORT);
});