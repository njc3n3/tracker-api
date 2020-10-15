import {gql, IResolvers} from 'apollo-server'
import {Routine, RoutineFolder, Exercise} from '../models'
import {filterOutFalsies} from '../utils'

export const routineTypeDefs = gql`
  "Acts as scaffolding for creating Workouts"
  type Routine {
    id: ID
    name: String
    notes: String
    routineFolder: RoutineFolder
    exercises: [Exercise]
  }

  input RoutineCreateInput {
    name: String!
    notes: String
    routineFolderId: ID
    exerciseIds: [ID]
  }

  input RoutineUpdateInput {
    id: ID!
    name: String
    notes: String
    routineFolderId: ID
    exerciseIds: [ID]
  }

  extend type Query {
    routine(id: ID!): Routine
    routines(routineFolderId: ID): [Routine]
  }

  extend type Mutation {
    addRoutine(routine: RoutineCreateInput!): Routine
    removeRoutine(id: ID!): Routine
    updateRoutine(routine: RoutineUpdateInput!): Routine
  }
`

export const routineResolvers: IResolvers<any, any> = {
  Query: {
    routine: (_parent, args) => Routine.findById(args.id),
    routines: (_parent, args) => Routine.find(args.routineFolderId ? {routineFolderId: args.routineFolderId} : {})
  },
  Mutation: {
    addRoutine: (_parent, args) => {
      const routine = new Routine({
        ...args.routine
      })
      return routine.save()
    },
    removeRoutine: (_parent, args) => {
      return Routine.findByIdAndDelete(args.id)
    },
    updateRoutine: (_parent, args) => {
      const {id, name, notes, routineFolderId, exerciseIds} = args.routine
      return Routine.findByIdAndUpdate({_id: id}, filterOutFalsies({name, notes, routineFolderId, exerciseIds}), {
        new: true
      })
    }
  },
  Routine: {
    routineFolder: (parent) => RoutineFolder.findById(parent.routineFolderId),
    exercises: (parent) => parent?.exerciseIds?.map((exerciseId: string) => Exercise.findById(exerciseId))
  }
}
