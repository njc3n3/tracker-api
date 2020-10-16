import {bodyPartTypeDefs, bodyPartResolvers} from './BodyPartGQL'
import {bodyweightWorkoutSetTypeDefs, bodyweightWorkoutSetResolvers} from './BodyweightWorkoutSetGQL'
import {exerciseTypeDefs, exerciseResolvers} from './ExerciseGQL'
import {routineFolderTypeDefs, routineFolderResolvers} from './RoutineFolderGQL'
import {routineTypeDefs, routineResolvers} from './RoutineGQL'
import {weightedWorkoutSetTypeDefs, weightedWorkoutSetResolvers} from './WeightedWorkoutSetGQL'
import {workoutExerciseTypeDefs, workoutExerciseResolvers} from './WorkoutExerciseGQL'
import {workoutTypeDefs, workoutResolvers} from './WorkoutGQL'
import {workoutSetTypeDefs, workoutSetResolvers} from './WorkoutSetGQL'

export const trackerTypeDefs = [
  bodyPartTypeDefs,
  bodyweightWorkoutSetTypeDefs,
  exerciseTypeDefs,
  routineFolderTypeDefs,
  routineTypeDefs,
  weightedWorkoutSetTypeDefs,
  workoutExerciseTypeDefs,
  workoutTypeDefs,
  workoutSetTypeDefs
]

export const trackerResolvers = [
  bodyPartResolvers,
  bodyweightWorkoutSetResolvers,
  exerciseResolvers,
  routineFolderResolvers,
  routineResolvers,
  weightedWorkoutSetResolvers,
  workoutExerciseResolvers,
  workoutResolvers,
  workoutSetResolvers
]
