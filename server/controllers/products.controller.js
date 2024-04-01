import Product from '../models/productsSchema.js';
import User from '../models/usersSchema.js';
import mongoose from "mongoose";

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images/');; // Postavljamo destinaciju za pohranu slika
  },
  filename: function (req, file, cb) {
    // Generisanje jedinstvenog imena za sliku (opcionalno)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage }).single('image');


export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().populate('authorId'); 
    res.status(200).json(allProducts);
  } catch (error) {
    console.log('Error in getAllProducts controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('authorId');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log('Error in getProductById controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const getProductsByAuthor = async (req,res)=>{
  try{
    const authorId=req.params.authorId
    const products = await Product.find({authorId}).populate('authorId')

    if(!products){
      res.status(404).send('No products post by this user')
    }
    res.status(200).send(products)
  }catch(error){
    console.log('Error in getProductsByAuthor controller',error.message)
    res.status(500).json('Server error')
  }
}

export const uploadProduct = async (req, res) => {
  try {
    const { Types } = mongoose; 
    
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error uploading image' });
      } else if (err) {
        return res.status(500).json({ message: 'Server error uploading image' });
      }

      const { name, about, price, authorId } = req.body;

      if (!Types.ObjectId.isValid(authorId)) {
        return res.status(400).json({ message: "Invalid authorId" });
      }

      const user = await User.findById(authorId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const imagePath = req.file.filename;

      const newProduct = new Product({
        name,
        about,
        price,
        authorId: user._id,
        imagePath: imagePath // Postavljamo putanju slike
      });

      await newProduct.save();

      res.status(201).json(newProduct);
    });
  } catch (error) {
    console.error('Error in uploadProduct controller:', error.message);
    res.status(500).json('Server error');
  }
};

export const updateAd=async(req,res)=>{
  try{
    const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      about:req.body.about,
      //author:req.body.author,
      price:req.body.price,
      //phoneNumber:req.body.phoneNumber
    })
    res.status(200).send(updatedProduct)
  }catch(error){
    console.log('Error in updateAd controller',error.message)
    console.log('Server error')
  }
}

export const deleteAd=async(req,res)=>{
  try{
    const deletedAd= await Product.findById(req.params.id)

    if(!deletedAd){
      return res.status(404).json({message:'Product not found'})
    }

    deletedAd.deleted = true;

    await deletedAd.save()

    res.status(200).json({message:'Product is successfully marked as deleted'})
  }catch(error){
    console.log('Error in deleteAd controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}