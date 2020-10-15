import mongoose, {Schema} from 'mongoose'

const workoutExerciseSchema = new Schema({
  exerciseId: String,
  workoutId: String
})

export const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema)
