import mongoose, {Schema} from 'mongoose'

const weightedWorkoutSetSchema = new Schema({
  weight: Number,
  repetitions: Number,
  workoutExerciseId: String
})

export const WeightedWorkoutSet = mongoose.model('WeightedWorkoutSet', weightedWorkoutSetSchema)
