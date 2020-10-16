import {gql, IResolvers} from 'apollo-server'
import {BodyweightWorkoutSet, WeightedWorkoutSet} from '../models'
import {addBodyweightWorkoutSet, updateBodyweightWorkoutSet} from './BodyweightWorkoutSetGQL'
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
    addWorkoutSet(
      weightedWorkoutSet: WeightedWorkoutSetCreateInput
      bodyweightWorkoutSet: BodyweightWorkoutSetCreateInput
    ): WorkoutSet
    removeWorkoutSet(id: ID!): WorkoutSet
    updateWorkoutSet(
      weightedWorkoutSet: WeightedWorkoutSetUpdateInput
      bodyweightWorkoutSet: BodyweightWorkoutSetUpdateInput
    ): WorkoutSet
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
      if (workoutSet.weight !== undefined && workoutSet.weight !== undefined) {
        set = 'WeightedWorkoutSet'
      } else if (workoutSet.repetitions !== undefined) {
        set = 'BodyweightWorkoutSet'
      }

      return set
    }
  }
}

const addWorkoutSet = (args: any) => {
  let workoutSet = null
  if (args.weightedWorkoutSet) {
    workoutSet = addWeightedWorkoutSet(args.weightedWorkoutSet)
  } else if (args.bodyweightWorkoutSet) {
    workoutSet = addBodyweightWorkoutSet(args.bodyweightWorkoutSet)
  }
  return workoutSet
}

const findWorkoutSet = async (workoutSetId: string) => {
  const weighted = await WeightedWorkoutSet.findById(workoutSetId)
  if (weighted) return weighted
  const bodyweight = await BodyweightWorkoutSet.findById(workoutSetId)
  if (bodyweight) return bodyweight
  return null
}

export const findAllWorkoutSets = async (workoutExerciseId?: string) => {
  const workoutSets = [
    ...(await WeightedWorkoutSet.find(workoutExerciseId ? {workoutExerciseId} : {})),
    ...(await BodyweightWorkoutSet.find(workoutExerciseId ? {workoutExerciseId} : {}))
  ]
  return workoutSets.length > 0 ? workoutSets : null
}

const updateWorkoutSet = (args: any) => {
  let workoutSet = null
  if (args.weightedWorkoutSet) {
    workoutSet = updateWeightedWorkoutSet(args.weightedWorkoutSet)
  } else if (args.bodyweightWorkoutSet) {
    workoutSet = updateBodyweightWorkoutSet(args.bodyweightWorkoutSet)
  }
  return workoutSet
}

const deleteWorkoutSet = async (workoutSetId: string) => {
  const weighted = await WeightedWorkoutSet.findByIdAndDelete(workoutSetId)
  if (weighted) return weighted
  const bodyweight = await BodyweightWorkoutSet.findByIdAndDelete(workoutSetId)
  if (bodyweight) return bodyweight
  return null
}

export const deleteAllWorkoutSets = (workoutExerciseId: string) => {
  // TODO: make a better way to handle returns
  return {
    ...WeightedWorkoutSet.deleteMany(
      {workoutExerciseId},
      // tslint:disable-next-line: no-empty
      () => {} // Mongoose won't delete without a return function
    ),
    ...BodyweightWorkoutSet.deleteMany(
      {workoutExerciseId},
      // tslint:disable-next-line: no-empty
      () => {} // Mongoose won't delete without a return function
    )
  }
}
