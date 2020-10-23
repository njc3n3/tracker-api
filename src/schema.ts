import {gql, IResolvers} from 'apollo-server'
// import {DIRECTIVES} from '@graphql-codegen/typescript-mongodb'
import {merge} from 'lodash'
import {trackerTypeDefs, trackerResolvers} from './gql'

const baseTypeDefs = gql`
  type Query
  type Mutation
`
export const typeDefs = [baseTypeDefs, ...trackerTypeDefs]
// export const typeDefs = [DIRECTIVES, baseTypeDefs, ...trackerTypeDefs]

export const resolvers: IResolvers = merge({}, ...trackerResolvers)
