import {gql, IResolvers} from 'apollo-server'
import {Workout, WorkoutExercise, WorkoutSet} from '../models'
import {filterOutFalsies} from '../utils'

export const workoutTypeDefs = gql`
  "Contains a collection of WorkoutExercises as well as time data for workout length calculation"
  type Workout {
    id: ID
    startTime: String
    endTime: String
    workoutExercises: [WorkoutExercise]
  }

  input WorkoutUpdateInput {
    id: ID!
    startTime: String
    endTime: String
  }

  extend type Query {
    workout(id: ID!): Workout
    workouts: [Workout]
  }

  extend type Mutation {
    addWorkout: Workout
    removeWorkout(id: ID!): Workout
    updateWorkout(workout: WorkoutUpdateInput!): Workout
    stopWorkout(id: ID!): Workout
  }
`

export const workoutResolvers: IResolvers<any, any> = {
  Query: {
    workout: (_parent, args) => Workout.findById(args.id),
    workouts: () => Workout.find()
  },
  Mutation: {
    addWorkout: () => {
      const workout = new Workout({
        startTime: new Date()
      })
      return workout.save()
    },
    removeWorkout: (_parent, args) => {
      WorkoutExercise.find({workoutId: args.id}).then((workoutExercises) => {
        workoutExercises.forEach((workoutExercise) => {
          WorkoutSet.deleteMany(
            {workoutExerciseId: workoutExercise.id},
            // tslint:disable-next-line: no-empty
            () => {} // Mongoose won't delete without a return function
          )
        }),
          WorkoutExercise.deleteMany(
            {workoutId: args.id},
            // tslint:disable-next-line: no-empty
            () => {} // Mongoose won't delete without a return function
          )
      })
      return Workout.findByIdAndDelete(args.id)
    },
    updateWorkout: (_parent, args) => {
      const {id, startTime, endTime} = args.workout
      return Workout.findByIdAndUpdate({_id: id}, filterOutFalsies({startTime, endTime}), {new: true})
    },
    stopWorkout: (_parent, args) => {
      return Workout.findByIdAndUpdate({_id: args.id}, {endTime: new Date()}, {new: true})
    }
  },
  Workout: {
    workoutExercises: (parent) => WorkoutExercise.find({workoutId: parent.id})
  }
}
