import mongoose, {Schema} from 'mongoose'

const exerciseSchema = new Schema({
  name: String,
  desc: String,
  bodyPartId: String,
  category: String
})

export const Exercise = mongoose.model('Exercise', exerciseSchema)
