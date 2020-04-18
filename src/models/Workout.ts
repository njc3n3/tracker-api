import mongoose, {Schema} from 'mongoose'

const workoutSchema = new Schema({
  startTime: String,
  endTime: String
})

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
