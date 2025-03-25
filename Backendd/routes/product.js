import express, { Router } from 'express';
const route = express.Router();
import{hanldeCreateProduct,handleDeleteProduct,handleAllProducts,handleUpdateofProduct} from '../controllers/product.js';


route.get("/products",handleAllProducts)
route.post("/products",  hanldeCreateProduct);
route.delete('/products/:id',handleDeleteProduct)
route.patch("/products/:id",handleUpdateofProduct)

export default route;
