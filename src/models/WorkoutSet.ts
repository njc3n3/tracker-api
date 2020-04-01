import mongoose, {Schema} from 'mongoose';

const workoutSetSchema = new Schema({
  weight: Number,
  repetitions: Number,
  workoutExerciseId: String,
});

const WorkoutSet = mongoose.model('WorkoutSet', workoutSetSchema);

export default WorkoutSet;
