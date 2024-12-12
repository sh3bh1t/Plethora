const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser= require('cookie-parser');
const userRoutes = require('./routes/user.routes.js');
const driverRoutes=require('./routes/driver.routes.js');
const mapRoutes=require('./routes/maps.routes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/user',userRoutes);
app.use('/driver',driverRoutes);
app.use('/maps',mapRoutes);

const port = 8080 || process.env.PORT ;
const mongo_uri=process.env.MONGO_URL;

main().then(() => {
    console.log('connected to db')
})
.catch((err) => {
        throw err;
    });


async function main() {
    await mongoose.connect(mongo_uri);
}

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})
