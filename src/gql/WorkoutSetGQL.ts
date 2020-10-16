import {gql, IResolvers} from 'apollo-server'
import {WeightedWorkoutSet} from '../models'
import {addWeightedWorkoutSet, updateWeightedWorkoutSet} from './WeightedWorkoutSetGQL'

export const workoutSetTypeDefs = gql`
  "Base fields for set types"
  interface WorkoutSet {
    id: ID
    workoutExercise: WorkoutExercise
  }

  extend type Query {
    workoutSet(id: ID!): WorkoutSet
    workoutSets(workoutExerciseId: ID!): [WorkoutSet]
  }

  extend type Mutation {
    "Only use one of these inputs at a time"
    addWorkoutSet(weightedWorkoutSet: WeightedWorkoutSetCreateInput): WorkoutSet
    removeWorkoutSet(id: ID!): WorkoutSet
    updateWorkoutSet(weightedWorkoutSet: WeightedWorkoutSetUpdateInput): WorkoutSet
  }
`

export const workoutSetResolvers: IResolvers<any, any> = {
  Query: {
    workoutSet: (_parent, args) => findWorkoutSet(args.id),
    workoutSets: (_parent, args) => findAllWorkoutSets(args.workoutExerciseId)
  },
  Mutation: {
    addWorkoutSet: (_parent, args) => addWorkoutSet(args),
    removeWorkoutSet: (_parent, args) => deleteWorkoutSet(args.id),
    updateWorkoutSet: (_parent, args) => updateWorkoutSet(args)
  },
  WorkoutSet: {
    __resolveType(workoutSet: any) {
      let set = null
      if (workoutSet.weight !== undefined) {
        set = 'WeightedWorkoutSet'
      }

      return set
    }
  }
}

const addWorkoutSet = (args: any) => {
  let workoutSet = null
  if (args.weightedWorkoutSet) {
    workoutSet = addWeightedWorkoutSet(args.weightedWorkoutSet)
  }
  return workoutSet
}

const findWorkoutSet = (workoutSetId: string) => {
  return WeightedWorkoutSet.findById(workoutSetId)
}

export const findAllWorkoutSets = (workoutExerciseId?: string) => {
  return WeightedWorkoutSet.find(workoutExerciseId ? {workoutExerciseId} : {})
}

const updateWorkoutSet = (args: any) => {
  let workoutSet = null
  if (args.weightedWorkoutSet) {
    workoutSet = updateWeightedWorkoutSet(args.weightedWorkoutSet)
  }
  return workoutSet
}

const deleteWorkoutSet = (workoutSetId: string) => {
  return WeightedWorkoutSet.findByIdAndDelete(workoutSetId)
}

export const deleteAllWorkoutSets = (workoutExerciseId: string) => {
  return WeightedWorkoutSet.deleteMany(
    {workoutExerciseId},
    // tslint:disable-next-line: no-empty
    () => {} // Mongoose won't delete without a return function
  )
}
