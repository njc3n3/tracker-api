import mongoose, {Schema} from 'mongoose'

const bodyPartSchema = new Schema({
  name: String,
  desc: String
})

export const BodyPart = mongoose.model('BodyPart', bodyPartSchema)
