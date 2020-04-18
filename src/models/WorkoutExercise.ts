import mongoose, {Schema} from 'mongoose'

const workoutExerciseSchema = new Schema({
  name: String,
  desc: String,
  workoutId: String
})

const WorkoutExercise = mongoose.model('WorkoutExercise', workoutExerciseSchema)

export default WorkoutExercise
