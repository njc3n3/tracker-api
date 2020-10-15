import mongoose, {Schema} from 'mongoose'

const exerciseSchema = new Schema({
  name: String,
  desc: String,
  categoryId: String
})

export const Exercise = mongoose.model('Exercise', exerciseSchema)
