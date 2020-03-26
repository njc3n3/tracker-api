import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {CategorySchema, CategoryMutations} from './Category';
import {ExerciseSchema, ExerciseMutations} from './Exercise';

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...CategorySchema,
    ...ExerciseSchema,
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...CategoryMutations,
    ...ExerciseMutations,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
