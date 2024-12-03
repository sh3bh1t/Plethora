const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(cors);

const port = process.env.PORT || 8080;
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
