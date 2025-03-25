import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
const PORT = process.env.PORT||5000;
import handleProductcreation from "./routes/product.js"
import cors from 'cors'
import Product from './models/product.js';
import path from 'path'

const app = express(); //craeting express app

app.use(cors({
  origin: 'http://localhost:5173'
}));

const __dirname =path.resolve( )

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/api", handleProductcreation);

if(process.env.NODE_ENV==="production"){

  app.use(express.static(path.join(__dirname, "/Frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
  })

}





app.listen(PORT, async() => {
  await connectDB()
  // await clearProducts()
  console.log(`server started on PORT : ${PORT}`)
})


const clearProducts = async () => {
  await Product.deleteMany()
  console.log("deleted")
}
