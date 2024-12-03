const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user.routes.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);

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
