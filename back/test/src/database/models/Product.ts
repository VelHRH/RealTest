import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imgUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Array,
    default: [],
  },
  companyId: {
    type: String,
    required: true,
  },
});

export const ProductModel = mongoose.model('Product', ProductSchema);
