import Product from '../models/product.js'
import mongoose from 'mongoose'


export async function handleAllProducts(req,res) {

    try {
        const allproducts = await Product.find({})
        if(!allproducts){
           return  res.status(404).json({sucess:false,message:"No products"})
        }
        res.status(200).json({sucess:true, message:"Getting products Sucessfull",data:allproducts})
    } catch (error) {

     res.status(404).json({ message: " invalid request", sucess: false })
     console.log("Error in getting of product", error.message)     
    
    }
    
}


 export async function hanldeCreateProduct(req, res) {

    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return  res.status(400).json({ sucess: false, message: "All fields are required" })
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(200).json({ sucess: true, data: newProduct })
    } catch (error) {
        res.status(500).json({ message: "server Error", sucess: false })
        console.log("Error in creation of product", error.message);
    }

}

 export async function handleDeleteProduct(req,res){
  const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){

     return res.status(500).json({sucess:false, message:"Invalid Id"})

}
try {
    const deletedId = await Product.findByIdAndDelete(id);
    if(!deletedId){
        return res.status(400).json({message:"ID not found"})
    }
    res.status(200).json({sucess:true,message:"Product deleted sucessfu;;y",data:deletedId})
} catch (error) {
    res.status(500).json({ message: "server error", sucess: false })
    console.log("Error in creation of product", error.message)  
}



}

export async function handleUpdateofProduct(req,res) {
        const {id} = req.params
      const product = req.body
        if(!mongoose.Types.ObjectId.isValid(id)){

           return res.status(500).json({sucess:false, message:"Invalid Id"})
        }

        try{
        await Product.findByIdAndUpdate(id,product);
        const updatedProduct = await Product.findById(id);
        res.status(200).json({sucess:true,message:"sucessfully updated" , data:updatedProduct})

    }catch (error) {
        res.status(404).json({ message: "Updated failed", sucess: false })
        console.log("Error in updating of product", error.message)     
        
    }
    
}



