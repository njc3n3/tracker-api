import mongoose, {Schema} from 'mongoose'

const workoutSetSchema = new Schema({
  weight: Number,
  repetitions: Number,
  workoutExerciseId: String,
  routineFolderId: String
})

export const WorkoutSet = mongoose.model('WorkoutSet', workoutSetSchema)
