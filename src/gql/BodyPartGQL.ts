import {gql} from 'apollo-server'
import {BodyPartResolvers, Resolvers} from '../generated/graphql'
import {
  IBodyPart,
  IBodyPartCreate,
  IBodyPartUpdate,
  BodyPart,
  Exercise,
  findOneById,
  addOne,
  findAll,
  updateOneById,
  deleteOneById,
  deleteMany,
  IExercise,
  IExerciseWhere
} from '../models'

export const bodyPartTypeDefs = gql`
  "Organizes Exercises for reference"
  type BodyPart {
    id: ID!
    name: String!
    exercises: [Exercise]
  }

  input BodyPartCreateInput {
    name: String!
  }

  input BodyPartUpdateInput {
    id: ID!
    name: String!
  }

  extend type Query {
    bodyPart(id: ID!): BodyPart
    bodyParts: [BodyPart]
  }

  extend type Mutation {
    addBodyPart(bodyPart: BodyPartCreateInput!): BodyPart
    removeBodyPart(id: ID!): BodyPart
    updateBodyPart(bodyPart: BodyPartUpdateInput!): BodyPart
  }
`

export const bodyPartResolvers: Resolvers<BodyPartResolvers> = {
  Query: {
    bodyPart: (_parent, args) => findOneById(BodyPart, args.id),
    bodyParts: () => findAll(BodyPart)
  },
  Mutation: {
    addBodyPart: (_parent, args) => addOne<IBodyPart, IBodyPartCreate>(BodyPart, args.bodyPart),
    removeBodyPart: (_parent, args) => {
      deleteMany<IExercise, IExerciseWhere>(Exercise, {bodyPartId: args.id})
      return deleteOneById(BodyPart, args.id)
    },
    updateBodyPart: (_parent, args) => updateOneById<IBodyPart, IBodyPartUpdate>(BodyPart, args.bodyPart)
  },
  // @ts-ignore
  BodyPart: {exercises: (parent) => findAll<IExercise, IExerciseWhere>(Exercise, {bodyPartId: parent.id})}
}
