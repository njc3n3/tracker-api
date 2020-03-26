import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFieldConfigMap,
  GraphQLList,
  Thunk,
} from 'graphql';
import {CategoryType} from './Category';
import Category from '../models/Category';
import Exercise from '../models/Exercise';
import {filterOutFalsies} from '../utils';

// Exercise Type
export const ExerciseType = new GraphQLObjectType({
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

// Exercise Create Input Type
export const ExerciseCreateInputType = new GraphQLInputObjectType({
  name: 'ExerciseCreateInput',
  fields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    desc: {type: GraphQLString},
    categoryId: {type: new GraphQLNonNull(GraphQLID)},
  },
});

// Exercise Update Input Type
export const ExerciseUpdateInputType = new GraphQLInputObjectType({
  name: 'ExerciseUpdateInput',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    categoryId: {type: GraphQLID},
  },
});

export const ExerciseSchema: Thunk<GraphQLFieldConfigMap<any, any, any>> = {
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
};

export const ExerciseMutations: Thunk<GraphQLFieldConfigMap<any, any, any>> = {
  addExercise: {
    type: ExerciseType,
    args: {
      exercise: {type: new GraphQLNonNull(ExerciseCreateInputType)},
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
      exercise: {type: new GraphQLNonNull(ExerciseUpdateInputType)},
    },
    resolve(_parent, args) {
      const {id, name, desc, categoryId} = args.exercise;
      return Exercise.findByIdAndUpdate(
        {_id: id},
        filterOutFalsies({name, desc, categoryId}),
        {new: true},
      );
    },
  },
};
