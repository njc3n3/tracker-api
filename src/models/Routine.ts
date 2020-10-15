import mongoose, {Schema} from 'mongoose'

const routineSchema = new Schema({
  name: String,
  notes: String,
  routineFolderId: String,
  exerciseIds: [String]
})

export const Routine = mongoose.model('Routine', routineSchema)
