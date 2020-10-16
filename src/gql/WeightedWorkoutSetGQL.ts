import {gql, IResolvers} from 'apollo-server'
import {WeightedWorkoutSet, WorkoutExercise} from '../models'
import {filterOutFalsies} from '../utils'

export const weightedWorkoutSetTypeDefs = gql`
  "Used to track weighted sets (barbells, dumbells, cables, etc.)"
  type WeightedWorkoutSet implements WorkoutSet {
    id: ID
    weight: Float
    repetitions: Int
    workoutExercise: WorkoutExercise
  }

  input WeightedWorkoutSetCreateInput {
    weight: Float
    repetitions: Int
    workoutExerciseId: ID!
  }

  input WeightedWorkoutSetUpdateInput {
    id: ID!
    weight: Float
    repetitions: Int
    workoutExerciseId: ID
  }
`

export const weightedWorkoutSetResolvers: IResolvers<any, any> = {
  WeightedWorkoutSet: {
    workoutExercise: (parent) => WorkoutExercise.findById(parent.workoutExerciseId)
  }
}

export const addWeightedWorkoutSet = (workoutSet: any) => {
  const {weight, repetitions, workoutExerciseId} = workoutSet
  const weightedWorkoutSet = new WeightedWorkoutSet({
    weight: weight || 0,
    repetitions: repetitions || 0,
    workoutExerciseId
  })
  return weightedWorkoutSet.save()
}

export const updateWeightedWorkoutSet = (workoutSet: any) => {
  const {id, weight, repetitions, workoutExerciseId} = workoutSet
  return WeightedWorkoutSet.findByIdAndUpdate({_id: id}, filterOutFalsies({weight, repetitions, workoutExerciseId}), {
    new: true
  })
}
