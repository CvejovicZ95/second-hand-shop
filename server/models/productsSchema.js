import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  imagePath: {
    type: String, // Ovo je putanja do slike proizvoda
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString(),
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
