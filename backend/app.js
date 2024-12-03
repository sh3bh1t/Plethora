const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require ('express');
const app=express();

app.use(cors);

const port=process.env.PORT||8080;


app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
})
