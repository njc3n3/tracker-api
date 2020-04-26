import mongoose, {Schema} from 'mongoose'

const workoutSchema = new Schema({
  startTime: Date,
  endTime: Date
})

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
