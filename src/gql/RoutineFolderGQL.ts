import {gql, IResolvers} from 'apollo-server'
import {RoutineFolder, Routine} from '../models'
import {filterOutFalsies} from '../utils'

export const routineFolderTypeDefs = gql`
  "Organizes Routines"
  type RoutineFolder {
    id: ID
    name: String
    routines: [Routine]
  }

  input RoutineFolderCreateInput {
    name: String!
  }

  input RoutineFolderUpdateInput {
    id: ID!
    name: String
  }

  extend type Query {
    routineFolder(id: ID!): RoutineFolder
    routineFolders: [RoutineFolder]
  }

  extend type Mutation {
    addRoutineFolder(routineFolder: RoutineFolderCreateInput!): RoutineFolder
    removeRoutineFolder(id: ID!): RoutineFolder
    updateRoutineFolder(routineFolder: RoutineFolderUpdateInput!): RoutineFolder
  }
`

export const routineFolderResolvers: IResolvers<any, any> = {
  Query: {
    routineFolder: (_parent, args) => RoutineFolder.findById(args.id),
    routineFolders: () => RoutineFolder.find()
  },
  Mutation: {
    addRoutineFolder: (_parent, args) => {
      const routineFolder = new RoutineFolder({
        ...args.routineFolder
      })
      return routineFolder.save()
    },
    removeRoutineFolder: (_parent, args) => {
      // TODO: Remove routineFolderId field from all Routines in that folder
      return RoutineFolder.findByIdAndDelete(args.id)
    },
    updateRoutineFolder: (_parent, args) => {
      const {id, name} = args.routineFolder
      return RoutineFolder.findByIdAndUpdate({_id: id}, filterOutFalsies({name}), {new: true})
    }
  },
  RoutineFolder: {routines: (parent) => Routine.find({routineFolderId: parent.id})}
}
