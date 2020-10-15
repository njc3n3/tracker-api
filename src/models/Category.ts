import mongoose, {Schema} from 'mongoose'

const categorySchema = new Schema({
  name: String,
  desc: String
})

export const Category = mongoose.model('Category', categorySchema)
