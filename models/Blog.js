import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
     blogTitle: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
    required: true
  },
  blogDescription: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    ref:'Users'
  },
  likes: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Blogs = mongoose.models.Blogs || mongoose.model('Blogs',BlogSchema)
export default Blogs