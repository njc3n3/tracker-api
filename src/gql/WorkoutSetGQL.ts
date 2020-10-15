import {gql, IResolvers} from 'apollo-server'
import {WorkoutSet, WorkoutExercise} from '../models'
import {filterOutFalsies} from '../utils'

export const workoutSetTypeDefs = gql`
  "Used to track weight, repetitions, time"
  type WorkoutSet {
    id: ID
    weight: Float
    repetitions: Int
    workoutExercise: WorkoutExercise
  }

  input WorkoutSetCreateInput {
    weight: Float
    repetitions: Int
    workoutExerciseId: ID!
  }

  input WorkoutSetUpdateInput {
    id: ID!
    weight: Float
    repetitions: Int
    workoutExerciseId: ID
  }

  extend type Query {
    workoutSet(id: ID!): WorkoutSet
    workoutSets(workoutExerciseId: ID!): [WorkoutSet]
  }

  extend type Mutation {
    addWorkoutSet(workoutSet: WorkoutSetCreateInput!): WorkoutSet
    removeWorkoutSet(id: ID!): WorkoutSet
    updateWorkoutSet(workoutSet: WorkoutSetUpdateInput!): WorkoutSet
  }
`

export const workoutSetResolvers: IResolvers<any, any> = {
  Query: {
    workoutSet: (_parent, args) => WorkoutSet.findById(args.id),
    workoutSets: (_parent, args) => WorkoutSet.find({workoutExerciseId: args.workoutExerciseId})
  },
  Mutation: {
    addWorkoutSet: (_parent, args) => {
      const workoutSet = new WorkoutSet({
        ...args.workoutSet
      })
      return workoutSet.save()
    },
    removeWorkoutSet: (_parent, args) => WorkoutSet.findByIdAndDelete(args.id),
    updateWorkoutSet: (_parent, args) => {
      const {id, weight, repetitions, workoutExerciseId} = args.workoutSet
      return WorkoutSet.findByIdAndUpdate({_id: id}, filterOutFalsies({weight, repetitions, workoutExerciseId}), {
        new: true
      })
    }
  },
  WorkoutSet: {
    workoutExercise: (parent) => WorkoutExercise.findById(parent.workoutExerciseId)
  }
}
