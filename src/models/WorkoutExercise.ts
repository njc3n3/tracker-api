import mongoose, {Schema} from 'mongoose'

const workoutExerciseSchema = new Schema({
  exerciseId: String,
  workoutId: String
})

const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema)

export default WorkoutExercise
