import {gql, IResolvers} from 'apollo-server'
import {BodyweightWorkoutSet, WorkoutExercise} from '../models'
import {filterOutFalsies} from '../utils'

export const bodyweightWorkoutSetTypeDefs = gql`
  "Used to track only set repetitions"
  type BodyweightWorkoutSet implements WorkoutSet {
    id: ID
    repetitions: Int
    workoutExercise: WorkoutExercise
  }

  input BodyweightWorkoutSetCreateInput {
    repetitions: Int
    workoutExerciseId: ID!
  }

  input BodyweightWorkoutSetUpdateInput {
    id: ID!
    repetitions: Int
    workoutExerciseId: ID
  }
`

export const bodyweightWorkoutSetResolvers: IResolvers<any, any> = {
  BodyweightWorkoutSet: {
    workoutExercise: (parent) => WorkoutExercise.findById(parent.workoutExerciseId)
  }
}

export const addBodyweightWorkoutSet = (workoutSet: any) => {
  const {repetitions, workoutExerciseId} = workoutSet
  const bodyweightWorkoutSet = new BodyweightWorkoutSet({
    repetitions: repetitions || 0,
    workoutExerciseId
  })
  return bodyweightWorkoutSet.save()
}

export const updateBodyweightWorkoutSet = (workoutSet: any) => {
  const {id, repetitions, workoutExerciseId} = workoutSet
  return BodyweightWorkoutSet.findByIdAndUpdate({_id: id}, filterOutFalsies({repetitions, workoutExerciseId}), {
    new: true
  })
}
