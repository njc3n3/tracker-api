import mongoose, {Schema} from 'mongoose'

const exerciseSchema = new Schema({
  name: String,
  desc: String,
  categoryId: String
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
