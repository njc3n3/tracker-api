import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import Category from './models/Category';
import Exercise from './models/Exercise';

// Category Type
const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent) {
        return Exercise.find({categoryId: parent.id});
      },
    },
  }),
});

// Exercise Type
const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    category: {
      type: CategoryType,
      resolve(parent) {
        return Category.findById(parent.categoryId);
      },
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    category: {
      type: CategoryType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(_parent, args) {
        return Category.findById(args.id);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find();
      },
    },
    exercise: {
      type: ExerciseType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(_parent, args) {
        return Exercise.findById(args.id);
      },
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      args: {
        categoryId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(_parent, args) {
        return Exercise.find({categoryId: args.categoryId});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCategory: {
      type: CategoryType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        desc: {type: GraphQLString},
      },
      resolve(_parent, args) {
        const category = new Category({
          ...args,
        });

        return category.save();
      },
    },
    addExercise: {
      type: ExerciseType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        desc: {type: GraphQLString},
        categoryId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(_parent, args) {
        const exercise = new Exercise({
          ...args,
        });

        return exercise.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
