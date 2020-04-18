import mongoose, {Schema} from 'mongoose'

const categorySchema = new Schema({
  name: String,
  desc: String
})

const Category = mongoose.model('Category', categorySchema)

export default Category
