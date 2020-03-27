import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFieldConfigMap,
  Thunk,
} from 'graphql';
import {ExerciseType} from './Exercise';
import Exercise from '../models/Exercise';
import Category from '../models/Category';
import {filterOutFalsies} from '../utils';

// Category Type
export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
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

// Category Create Input Type
export const CategoryCreateInputType = new GraphQLInputObjectType({
  name: 'CategoryCreateInput',
  fields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    desc: {type: GraphQLString},
  },
});

// Category Update Input Type
export const CategoryUpdateInputType = new GraphQLInputObjectType({
  name: 'CategoryUpdateInput',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
  },
});

export const CategorySchema: Thunk<GraphQLFieldConfigMap<any, any, any>> = {
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
};

export const CategoryMutations: Thunk<GraphQLFieldConfigMap<any, any, any>> = {
  addCategory: {
    type: CategoryType,
    args: {
      category: {type: new GraphQLNonNull(CategoryCreateInputType)},
    },
    resolve(_parent, args) {
      const category = new Category({
        ...args.category,
      });

      return category.save();
    },
  },
  removeCategory: {
    type: CategoryType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
    },
    resolve(_parent, args) {
      return Category.findByIdAndDelete(args.id);
    },
  },
  updateCategory: {
    type: CategoryType,
    args: {
      category: {type: new GraphQLNonNull(CategoryUpdateInputType)},
    },
    resolve(_parent, args) {
      const {id, name, desc} = args.category;
      return Category.findByIdAndUpdate(
        {_id: id},
        filterOutFalsies({name, desc}),
        {
          new: true,
        },
      );
    },
  },
};
