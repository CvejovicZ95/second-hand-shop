import { Product } from '../models/productsSchema.js'
import { User } from '../models/usersSchema.js'
import mongoose from 'mongoose'
import multer from 'multer'
import { logger } from '../../logger.js'

import { getAllProducts, getProductById, getProductsByAuthor, updateProductById, markProductAsDeleted } from '../service/productService.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage }).single('image')

export const getAllProductsController = async (req, res) => {
  try {
    const allProducts = await getAllProducts()
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await getProductById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getProductsByAuthorController = async (req, res) => {
  try {
    const authorId = req.params.authorId
    const products = await getProductsByAuthor(authorId)
    if (!products || products.length === 0) {
      return res.status(404).send('No products posted by this user')
    }
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const uploadProduct = async (req, res) => {
  try {
    const { Types } = mongoose

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        logger.error('Error uploading image')
        return res.status(400).json({ message: 'Error uploading image' })
      } else if (err) {
        logger.error('Server error uploading image')
        return res.status(500).json({ message: 'Server error uploading image' })
      }

      const { name, about, price, authorId } = req.body

      if (!Types.ObjectId.isValid(authorId)) {
        logger.error('Invalid authorId')
        return res.status(400).json({ message: 'Invalid authorId' })
      }

      const user = await User.findById(authorId)
      if (!user) {
        logger.error('User not found')
        return res.status(400).json({ message: 'User not found' })
      }

      const imagePath = req.file.filename

      const newProduct = new Product({
        name,
        about,
        price,
        authorId: user._id,
        imagePath
      })

      await newProduct.save()
      logger.info('Product uploaded successfully')
      res.status(201).json(newProduct)
    })
  } catch (error) {
    logger.error('Error in uploadProduct controller:', error.message)
    res.status(500).json('Server error')
  }
}

export const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id
    const newData = req.body
    const updatedProduct = await updateProductById(productId, newData)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json('Server error')
  }
}

export const markProductAsDeletedController = async (req, res) => {
  try {
    const productId = req.params.id
    await markProductAsDeleted(productId)
    res.status(200).json({ message: 'Product is successfully marked as deleted' })
  } catch (error) {
    res.status(500).json('Server error')
  }
}
