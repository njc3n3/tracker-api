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
    removeCategory: {
      type: CategoryType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(_parent, args) {
        return Category.findByIdAndDelete(args.id);
      },
    },
    updateCategory: {
      type: CategoryType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        desc: {type: GraphQLString},
      },
      resolve(_parent, args) {
        const {id, name, desc} = args;
        return Category.findByIdAndUpdate({_id: id}, {name, desc}, {new: true});
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
    removeExercise: {
      type: ExerciseType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(_parent, args) {
        return Exercise.findByIdAndDelete(args.id);
      },
    },
    updateExercise: {
      type: ExerciseType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        desc: {type: GraphQLString},
        categoryId: {type: GraphQLID},
      },
      resolve(_parent, args) {
        const {id, name, desc, categoryId} = args;
        return Exercise.findByIdAndUpdate(
          {_id: id},
          {name, desc, categoryId},
          {new: true},
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
