import {gql, IResolvers} from 'apollo-server'
import {BodyPart, Exercise} from '../models'
import {filterOutFalsies} from '../utils'

export const bodyPartTypeDefs = gql`
  "Organizes Exercises for reference"
  type BodyPart {
    id: ID
    name: String
    exercises: [Exercise]
  }

  input BodyPartCreateInput {
    name: String!
  }

  input BodyPartUpdateInput {
    id: ID!
    name: String
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

export const bodyPartResolvers: IResolvers<any, any> = {
  Query: {
    bodyPart: (_parent, args) => BodyPart.findById(args.id),
    bodyParts: () => BodyPart.find()
  },
  Mutation: {
    addBodyPart: (_parent, args) => {
      const bodyPart = new BodyPart({
        ...args.bodyPart
      })
      return bodyPart.save()
    },
    removeBodyPart: (_parent, args) => {
      Exercise.deleteMany(
        {bodyPartId: args.id},
        // tslint:disable-next-line: no-empty
        () => {} // Mongoose won't delete without a return function
      )
      return BodyPart.findByIdAndDelete(args.id)
    },
    updateBodyPart: (_parent, args) => {
      const {id, name} = args.bodyPart
      return BodyPart.findByIdAndUpdate({_id: id}, filterOutFalsies({name}), {new: true})
    }
  },
  BodyPart: {exercises: (parent) => Exercise.find({bodyPartId: parent.id})}
}
