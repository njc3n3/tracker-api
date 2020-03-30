import {gql, IResolvers} from 'apollo-server';
import Category from './models/Category';
import Exercise from './models/Exercise';
import {filterOutFalsies} from './utils';

export const typeDefs = gql`
  ### CATEGORY ###
  type Category {
    id: ID
    name: String
    desc: String
    exercises: [Exercise]
  }

  input CategoryCreateInput {
    name: String!
    desc: String
  }

  input CategoryUpdateInput {
    id: ID!
    name: String
    desc: String
  }

  ### EXERCISE ###
  type Exercise {
    id: ID
    name: String
    desc: String
    category: Category
  }

  input ExerciseCreateInput {
    name: String!
    desc: String
    categoryId: ID!
  }

  input ExerciseUpdateInput {
    id: ID!
    name: String
    desc: String
    categoryId: ID
  }

  ### QUERY ###
  type Query {
    # CATEGORY
    category(id: ID!): Category
    categories: [Category]
    # EXERCISE
    exercise(id: ID!): Exercise
    exercises(categoryId: ID!): [Exercise]
  }

  ### MUTATION ###
  type Mutation {
    # CATEGORY
    addCategory(category: CategoryCreateInput!): Category
    removeCategory(id: ID!): Category
    updateCategory(category: CategoryUpdateInput!): Category
    # EXERCISE
    addExercise(exercise: ExerciseCreateInput!): Exercise
    removeExercise(id: ID!): Exercise
    updateExercise(exercise: ExerciseUpdateInput!): Exercise
  }
`;

export const resolvers: IResolvers<any, any> = {
  Query: {
    // CATEGORY
    category: (_parent, args) => Category.findById(args.id),
    categories: () => Category.find(),
    // EXERCISE
    exercise: (_parent, args) => Exercise.findById(args.id),
    exercises: (_parent, args) => Exercise.find({categoryId: args.categoryId}),
  },
  Mutation: {
    // CATEGORY
    addCategory: (_parent, args) => {
      const category = new Category({
        ...args.category,
      });
      return category.save();
    },
    removeCategory: (_parent, args) => {
      Exercise.deleteMany(
        {categoryId: args.id},
        // tslint:disable-next-line: no-empty
        () => {}, // Mongoose won't delete without a return function
      );
      return Category.findByIdAndDelete(args.id);
    },
    updateCategory: (_parent, args) => {
      const {id, name, desc} = args.category;
      return Category.findByIdAndUpdate(
        {_id: id},
        filterOutFalsies({name, desc}),
        {
          new: true,
        },
      );
    },
    // EXERCISE
    addExercise: (_parent, args) => {
      const exercise = new Exercise({
        ...args.exercise,
      });
      return exercise.save();
    },
    removeExercise: (_parent, args) => Exercise.findByIdAndDelete(args.id),
    updateExercise: (_parent, args) => {
      const {id, name, desc, categoryId} = args.exercise;
      return Exercise.findByIdAndUpdate(
        {_id: id},
        filterOutFalsies({name, desc, categoryId}),
        {new: true},
      );
    },
  },
  Category: {exercises: parent => Exercise.find({categoryId: parent.id})},
  Exercise: {category: parent => Category.findById(parent.categoryId)},
};
