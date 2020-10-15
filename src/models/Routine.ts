import mongoose, {Schema} from 'mongoose'

const routineSchema = new Schema({
  name: String,
  notes: String,
  exerciseIds: [String]
})

const Routine = mongoose.model('Routine', routineSchema)

export default Routine
