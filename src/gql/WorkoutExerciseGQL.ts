import {gql, IResolvers} from 'apollo-server'
import {WorkoutExercise, Exercise, Workout} from '../models'
import {filterOutFalsies} from '../utils'
import {deleteAllWorkoutSets, findAllWorkoutSets} from './WorkoutSetGQL'

export const workoutExerciseTypeDefs = gql`
  "A Workout specific exercise object used for tracking WorkoutSets"
  type WorkoutExercise {
    id: ID
    exercise: Exercise
    workout: Workout
    workoutSets: [WorkoutSet]
  }

  input CreateWorkoutExerciseInput { # Switched naming pattern to prevent Apollo errors
    exerciseId: ID!
    workoutId: ID!
  }

  input UpdateWorkoutExerciseInput { # Switched naming pattern to prevent Apollo errors
    exerciseId: ID
    workoutId: ID
  }

  extend type Query {
    workoutExercise(id: ID!): WorkoutExercise
    workoutExercises(workoutId: ID!): [WorkoutExercise]
  }

  extend type Mutation {
    addWorkoutExercise(workoutExercise: CreateWorkoutExerciseInput!): WorkoutExercise
    removeWorkoutExercise(id: ID!): WorkoutExercise
    updateWorkoutExercise(workoutExercise: UpdateWorkoutExerciseInput!): WorkoutExercise
  }
`

export const workoutExerciseResolvers: IResolvers<any, any> = {
  Query: {
    workoutExercise: (_parent, args) => WorkoutExercise.findById(args.id),
    workoutExercises: (_parent, args) => WorkoutExercise.find({workoutId: args.workoutId})
  },
  Mutation: {
    addWorkoutExercise: (_parent, args) => {
      const workoutExercise = new WorkoutExercise({
        ...args.workoutExercise
      })
      return workoutExercise.save()
    },
    removeWorkoutExercise: (_parent, args) => {
      deleteAllWorkoutSets(args.id)
      return WorkoutExercise.findByIdAndDelete(args.id)
    },
    updateWorkoutExercise: (_parent, args) => {
      const {id, exerciseId, workoutId} = args.workoutExercise
      return WorkoutExercise.findByIdAndUpdate({_id: id}, filterOutFalsies({exerciseId, workoutId}), {new: true})
    }
  },
  WorkoutExercise: {
    exercise: (parent) => Exercise.findById(parent.exerciseId),
    workout: (parent) => Workout.findById(parent.workoutId),
    workoutSets: (parent) => findAllWorkoutSets(parent.id)
  }
}
