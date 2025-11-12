import express, { Router } from "express";

import { addProduct,
     listProducts, 
     removeProduct, 
     singleProduct } 
     from "../Controllers/ProductController.js";
import upload from "../Middleware/Multer.js";
import adminAuth from "../Middleware/AdminAuth.js";


const ProductRoute = Router()

// ProductRoute.get("/add",(req,res)=>{
//     res.send("Hello From Product")
// })

ProductRoute.post("/add",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1}]),
    adminAuth,
    addProduct),
    


ProductRoute.post("/remove",removeProduct)
ProductRoute.get("/list",listProducts)
ProductRoute.get("/single",singleProduct)

export default ProductRoute;