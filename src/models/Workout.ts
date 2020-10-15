import mongoose, {Schema} from 'mongoose'

const workoutSchema = new Schema({
  startTime: Date,
  endTime: Date
})

export const Workout = mongoose.model('Workout', workoutSchema)
