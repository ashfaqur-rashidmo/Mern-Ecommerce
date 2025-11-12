import { v2 as cloudinary } from "cloudinary";
import productModel from "../Models/ProductModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      _type,
      name,
      price,
      discountedPercentage,
      category,
      brand,
      badge,
      isAvailable,
      offer,
      description,
      tags
    } = req.body;

    console.log(req.body);
    console.log(req.files);
    
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    if (!name){ 
      return res.send({ success: false, message: "Product name is required!" })
    };

    if (!price){
       return res.send({ success: false, message: "Product price is required!" })
    };

    if (!category){
        return res.send({ success: false, message: "Product category is required!"
        });
      }

    if (!description){
        return  res.send({ success: false, message: "Product description is required!" });
    }

    let images = [image1,image2].filter((item)=>item!==undefined)

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags)
    } catch (error) {
      parsedTags = tags ? tags.split(', ').map((tag)=>tag.trim()) : [];
    }

    const productData = {
      _type: _type ? _type : "",
      name,
      price: Number(price),
      discountedPercentage: Number(discountedPercentage) || 0,
      category,
      brand: brand ? brand : "",
      badge: badge === "true" ? true : false,
      isAvailable: isAvailable === "true" ? true : false,
      offer: offer === "true" ? true : false,
      description,
      tags: tags ? parsedTags : [],
      images: imageUrl,
    };

    // console.log("productData",productData);
     const product = new productModel(productData)
     product.save()

     res.json({
      success: true,
      message: `${name} added and saved to DB successfully`,
      product: productData, 
    });
  } catch (error) {
    console.error("error", error);
    return res.json({ success: false, message: error.message });
  }
}

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body._id)
    res.json({success:true,message:"Product Removed Successful"})
  } catch (error) {
    console.log("Error",error);
    return res.json({success:true,message: error.message})
    
  }
};
const listProducts = async (req, res) => {
  try {
    const listProduct = await productModel.countDocuments({});
    const products = await productModel.find({})

    if(products.length){
      res.send({success:true,listProduct,products})
        
      }
      else{
          return res.json({success:false,message:"No Product Found"})
      }



  } catch (error) {
    console.log("Error",error);
    return res.json({success:false,message:error.message})
  }
};


const singleProduct = async (req, res) => {
     try {
     
      const {_id} = req.query;
      const product = await productModel.findById(_id)
      if(!product){
        return res.json({success:false,message:"No Product Matched"})
      }
      res.json({success:true,product})
     } catch (error) {
       console.log("Error",error);
       return res.json({success:false,message:error.message})
     }
};

export { addProduct, removeProduct, listProducts, singleProduct };



