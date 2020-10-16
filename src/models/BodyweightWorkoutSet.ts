import mongoose, {Schema} from 'mongoose'

const bodyweightWorkoutSetSchema = new Schema({
  repetitions: Number,
  workoutExerciseId: String
})

export const BodyweightWorkoutSet = mongoose.model('BodyweightWorkoutSet', bodyweightWorkoutSetSchema)
