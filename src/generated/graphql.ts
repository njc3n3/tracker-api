import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  bodyPart?: Maybe<BodyPart>;
  bodyParts?: Maybe<Array<Maybe<BodyPart>>>;
  exercise?: Maybe<Exercise>;
  exercises?: Maybe<Array<Maybe<Exercise>>>;
  routineFolder?: Maybe<RoutineFolder>;
  routineFolders?: Maybe<Array<Maybe<RoutineFolder>>>;
  routine?: Maybe<Routine>;
  routines?: Maybe<Array<Maybe<Routine>>>;
  workoutExercise?: Maybe<WorkoutExercise>;
  workoutExercises?: Maybe<Array<Maybe<WorkoutExercise>>>;
  workout?: Maybe<Workout>;
  workouts?: Maybe<Array<Maybe<Workout>>>;
  workoutSet?: Maybe<WorkoutSet>;
  workoutSets?: Maybe<Array<Maybe<WorkoutSet>>>;
};


export type QueryBodyPartArgs = {
  id: Scalars['ID'];
};


export type QueryExerciseArgs = {
  id: Scalars['ID'];
};


export type QueryExercisesArgs = {
  bodyPartId: Scalars['ID'];
};


export type QueryRoutineFolderArgs = {
  id: Scalars['ID'];
};


export type QueryRoutineArgs = {
  id: Scalars['ID'];
};


export type QueryRoutinesArgs = {
  routineFolderId?: Maybe<Scalars['ID']>;
};


export type QueryWorkoutExerciseArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutExercisesArgs = {
  workoutId: Scalars['ID'];
};


export type QueryWorkoutArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutSetArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutSetsArgs = {
  workoutExerciseId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBodyPart?: Maybe<BodyPart>;
  removeBodyPart?: Maybe<BodyPart>;
  updateBodyPart?: Maybe<BodyPart>;
  addExercise?: Maybe<Exercise>;
  removeExercise?: Maybe<Exercise>;
  updateExercise?: Maybe<Exercise>;
  addRoutineFolder?: Maybe<RoutineFolder>;
  removeRoutineFolder?: Maybe<RoutineFolder>;
  updateRoutineFolder?: Maybe<RoutineFolder>;
  addRoutine?: Maybe<Routine>;
  removeRoutine?: Maybe<Routine>;
  updateRoutine?: Maybe<Routine>;
  addWorkoutExercise?: Maybe<WorkoutExercise>;
  removeWorkoutExercise?: Maybe<WorkoutExercise>;
  updateWorkoutExercise?: Maybe<WorkoutExercise>;
  addWorkout?: Maybe<Workout>;
  removeWorkout?: Maybe<Workout>;
  updateWorkout?: Maybe<Workout>;
  stopWorkout?: Maybe<Workout>;
  /** Only use one of these inputs at a time */
  addWorkoutSet?: Maybe<WorkoutSet>;
  removeWorkoutSet?: Maybe<WorkoutSet>;
  updateWorkoutSet?: Maybe<WorkoutSet>;
};


export type MutationAddBodyPartArgs = {
  bodyPart: BodyPartCreateInput;
};


export type MutationRemoveBodyPartArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBodyPartArgs = {
  bodyPart: BodyPartUpdateInput;
};


export type MutationAddExerciseArgs = {
  exercise: ExerciseCreateInput;
};


export type MutationRemoveExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateExerciseArgs = {
  exercise: ExerciseUpdateInput;
};


export type MutationAddRoutineFolderArgs = {
  routineFolder: RoutineFolderCreateInput;
};


export type MutationRemoveRoutineFolderArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRoutineFolderArgs = {
  routineFolder: RoutineFolderUpdateInput;
};


export type MutationAddRoutineArgs = {
  routine: RoutineCreateInput;
};


export type MutationRemoveRoutineArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRoutineArgs = {
  routine: RoutineUpdateInput;
};


export type MutationAddWorkoutExerciseArgs = {
  workoutExercise: CreateWorkoutExerciseInput;
};


export type MutationRemoveWorkoutExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkoutExerciseArgs = {
  workoutExercise: UpdateWorkoutExerciseInput;
};


export type MutationRemoveWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkoutArgs = {
  workout: WorkoutUpdateInput;
};


export type MutationStopWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationAddWorkoutSetArgs = {
  weightedWorkoutSet?: Maybe<WeightedWorkoutSetCreateInput>;
  bodyweightWorkoutSet?: Maybe<BodyweightWorkoutSetCreateInput>;
};


export type MutationRemoveWorkoutSetArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkoutSetArgs = {
  weightedWorkoutSet?: Maybe<WeightedWorkoutSetUpdateInput>;
  bodyweightWorkoutSet?: Maybe<BodyweightWorkoutSetUpdateInput>;
};

/** Organizes Exercises for reference */
export type BodyPart = {
  __typename?: 'BodyPart';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  exercises?: Maybe<Array<Maybe<Exercise>>>;
};

export type BodyPartCreateInput = {
  name: Scalars['String'];
};

export type BodyPartUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

/** Used to track only set repetitions */
export type BodyweightWorkoutSet = WorkoutSet & {
  __typename?: 'BodyweightWorkoutSet';
  id?: Maybe<Scalars['ID']>;
  repetitions?: Maybe<Scalars['Int']>;
  workoutExercise?: Maybe<WorkoutExercise>;
};

export type BodyweightWorkoutSetCreateInput = {
  repetitions?: Maybe<Scalars['Int']>;
  workoutExerciseId: Scalars['ID'];
};

export type BodyweightWorkoutSetUpdateInput = {
  id: Scalars['ID'];
  repetitions?: Maybe<Scalars['Int']>;
  workoutExerciseId?: Maybe<Scalars['ID']>;
};

/** Exercise related data for reference in other objects */
export type Exercise = {
  __typename?: 'Exercise';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  bodyPart?: Maybe<BodyPart>;
  category?: Maybe<Category>;
};

export type ExerciseCreateInput = {
  name: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  bodyPartId: Scalars['ID'];
  category: Category;
};

export type ExerciseUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  bodyPartId?: Maybe<Scalars['ID']>;
  category?: Maybe<Category>;
};

/** Used to create the different kinds of workout sets */
export enum Category {
  Weighted = 'Weighted',
  Bodyweight = 'Bodyweight',
  WeightedBodyweight = 'WeightedBodyweight',
  AssistedBodyWeight = 'AssistedBodyWeight',
  Duration = 'Duration'
}

/** Organizes Routines */
export type RoutineFolder = {
  __typename?: 'RoutineFolder';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  routines?: Maybe<Array<Maybe<Routine>>>;
};

export type RoutineFolderCreateInput = {
  name: Scalars['String'];
};

export type RoutineFolderUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

/** Acts as scaffolding for creating Workouts */
export type Routine = {
  __typename?: 'Routine';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  routineFolder?: Maybe<RoutineFolder>;
  exercises?: Maybe<Array<Maybe<Exercise>>>;
};

export type RoutineCreateInput = {
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  routineFolderId?: Maybe<Scalars['ID']>;
  exerciseIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type RoutineUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  routineFolderId?: Maybe<Scalars['ID']>;
  exerciseIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Used to track weighted sets (barbells, dumbells, cables, etc.) */
export type WeightedWorkoutSet = WorkoutSet & {
  __typename?: 'WeightedWorkoutSet';
  id?: Maybe<Scalars['ID']>;
  weight?: Maybe<Scalars['Float']>;
  repetitions?: Maybe<Scalars['Int']>;
  workoutExercise?: Maybe<WorkoutExercise>;
};

export type WeightedWorkoutSetCreateInput = {
  weight?: Maybe<Scalars['Float']>;
  repetitions?: Maybe<Scalars['Int']>;
  workoutExerciseId: Scalars['ID'];
};

export type WeightedWorkoutSetUpdateInput = {
  id: Scalars['ID'];
  weight?: Maybe<Scalars['Float']>;
  repetitions?: Maybe<Scalars['Int']>;
  workoutExerciseId?: Maybe<Scalars['ID']>;
};

/** A Workout specific exercise object used for tracking WorkoutSets */
export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  id?: Maybe<Scalars['ID']>;
  exercise?: Maybe<Exercise>;
  workout?: Maybe<Workout>;
  workoutSets?: Maybe<Array<Maybe<WorkoutSet>>>;
};

export type CreateWorkoutExerciseInput = {
  exerciseId: Scalars['ID'];
  workoutId: Scalars['ID'];
};

export type UpdateWorkoutExerciseInput = {
  exerciseId?: Maybe<Scalars['ID']>;
  workoutId?: Maybe<Scalars['ID']>;
};

/** Contains a collection of WorkoutExercises as well as time data for workout length calculation */
export type Workout = {
  __typename?: 'Workout';
  id?: Maybe<Scalars['ID']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  workoutExercises?: Maybe<Array<Maybe<WorkoutExercise>>>;
};

export type WorkoutUpdateInput = {
  id: Scalars['ID'];
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
};

/** Base fields for set types */
export type WorkoutSet = {
  id?: Maybe<Scalars['ID']>;
  workoutExercise?: Maybe<WorkoutExercise>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  BodyPart: ResolverTypeWrapper<BodyPart>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BodyPartCreateInput: BodyPartCreateInput;
  BodyPartUpdateInput: BodyPartUpdateInput;
  BodyweightWorkoutSet: ResolverTypeWrapper<BodyweightWorkoutSet>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BodyweightWorkoutSetCreateInput: BodyweightWorkoutSetCreateInput;
  BodyweightWorkoutSetUpdateInput: BodyweightWorkoutSetUpdateInput;
  Exercise: ResolverTypeWrapper<Exercise>;
  ExerciseCreateInput: ExerciseCreateInput;
  ExerciseUpdateInput: ExerciseUpdateInput;
  Category: Category;
  RoutineFolder: ResolverTypeWrapper<RoutineFolder>;
  RoutineFolderCreateInput: RoutineFolderCreateInput;
  RoutineFolderUpdateInput: RoutineFolderUpdateInput;
  Routine: ResolverTypeWrapper<Routine>;
  RoutineCreateInput: RoutineCreateInput;
  RoutineUpdateInput: RoutineUpdateInput;
  WeightedWorkoutSet: ResolverTypeWrapper<WeightedWorkoutSet>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  WeightedWorkoutSetCreateInput: WeightedWorkoutSetCreateInput;
  WeightedWorkoutSetUpdateInput: WeightedWorkoutSetUpdateInput;
  WorkoutExercise: ResolverTypeWrapper<WorkoutExercise>;
  CreateWorkoutExerciseInput: CreateWorkoutExerciseInput;
  UpdateWorkoutExerciseInput: UpdateWorkoutExerciseInput;
  Workout: ResolverTypeWrapper<Workout>;
  WorkoutUpdateInput: WorkoutUpdateInput;
  WorkoutSet: ResolversTypes['BodyweightWorkoutSet'] | ResolversTypes['WeightedWorkoutSet'];
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  Mutation: {};
  BodyPart: BodyPart;
  String: Scalars['String'];
  BodyPartCreateInput: BodyPartCreateInput;
  BodyPartUpdateInput: BodyPartUpdateInput;
  BodyweightWorkoutSet: BodyweightWorkoutSet;
  Int: Scalars['Int'];
  BodyweightWorkoutSetCreateInput: BodyweightWorkoutSetCreateInput;
  BodyweightWorkoutSetUpdateInput: BodyweightWorkoutSetUpdateInput;
  Exercise: Exercise;
  ExerciseCreateInput: ExerciseCreateInput;
  ExerciseUpdateInput: ExerciseUpdateInput;
  RoutineFolder: RoutineFolder;
  RoutineFolderCreateInput: RoutineFolderCreateInput;
  RoutineFolderUpdateInput: RoutineFolderUpdateInput;
  Routine: Routine;
  RoutineCreateInput: RoutineCreateInput;
  RoutineUpdateInput: RoutineUpdateInput;
  WeightedWorkoutSet: WeightedWorkoutSet;
  Float: Scalars['Float'];
  WeightedWorkoutSetCreateInput: WeightedWorkoutSetCreateInput;
  WeightedWorkoutSetUpdateInput: WeightedWorkoutSetUpdateInput;
  WorkoutExercise: WorkoutExercise;
  CreateWorkoutExerciseInput: CreateWorkoutExerciseInput;
  UpdateWorkoutExerciseInput: UpdateWorkoutExerciseInput;
  Workout: Workout;
  WorkoutUpdateInput: WorkoutUpdateInput;
  WorkoutSet: ResolversParentTypes['BodyweightWorkoutSet'] | ResolversParentTypes['WeightedWorkoutSet'];
  Upload: Scalars['Upload'];
  Boolean: Scalars['Boolean'];
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bodyPart?: Resolver<Maybe<ResolversTypes['BodyPart']>, ParentType, ContextType, RequireFields<QueryBodyPartArgs, 'id'>>;
  bodyParts?: Resolver<Maybe<Array<Maybe<ResolversTypes['BodyPart']>>>, ParentType, ContextType>;
  exercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, RequireFields<QueryExerciseArgs, 'id'>>;
  exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType, RequireFields<QueryExercisesArgs, 'bodyPartId'>>;
  routineFolder?: Resolver<Maybe<ResolversTypes['RoutineFolder']>, ParentType, ContextType, RequireFields<QueryRoutineFolderArgs, 'id'>>;
  routineFolders?: Resolver<Maybe<Array<Maybe<ResolversTypes['RoutineFolder']>>>, ParentType, ContextType>;
  routine?: Resolver<Maybe<ResolversTypes['Routine']>, ParentType, ContextType, RequireFields<QueryRoutineArgs, 'id'>>;
  routines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Routine']>>>, ParentType, ContextType, RequireFields<QueryRoutinesArgs, never>>;
  workoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType, RequireFields<QueryWorkoutExerciseArgs, 'id'>>;
  workoutExercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkoutExercise']>>>, ParentType, ContextType, RequireFields<QueryWorkoutExercisesArgs, 'workoutId'>>;
  workout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutArgs, 'id'>>;
  workouts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workout']>>>, ParentType, ContextType>;
  workoutSet?: Resolver<Maybe<ResolversTypes['WorkoutSet']>, ParentType, ContextType, RequireFields<QueryWorkoutSetArgs, 'id'>>;
  workoutSets?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkoutSet']>>>, ParentType, ContextType, RequireFields<QueryWorkoutSetsArgs, 'workoutExerciseId'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBodyPart?: Resolver<Maybe<ResolversTypes['BodyPart']>, ParentType, ContextType, RequireFields<MutationAddBodyPartArgs, 'bodyPart'>>;
  removeBodyPart?: Resolver<Maybe<ResolversTypes['BodyPart']>, ParentType, ContextType, RequireFields<MutationRemoveBodyPartArgs, 'id'>>;
  updateBodyPart?: Resolver<Maybe<ResolversTypes['BodyPart']>, ParentType, ContextType, RequireFields<MutationUpdateBodyPartArgs, 'bodyPart'>>;
  addExercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, RequireFields<MutationAddExerciseArgs, 'exercise'>>;
  removeExercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, RequireFields<MutationRemoveExerciseArgs, 'id'>>;
  updateExercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, RequireFields<MutationUpdateExerciseArgs, 'exercise'>>;
  addRoutineFolder?: Resolver<Maybe<ResolversTypes['RoutineFolder']>, ParentType, ContextType, RequireFields<MutationAddRoutineFolderArgs, 'routineFolder'>>;
  removeRoutineFolder?: Resolver<Maybe<ResolversTypes['RoutineFolder']>, ParentType, ContextType, RequireFields<MutationRemoveRoutineFolderArgs, 'id'>>;
  updateRoutineFolder?: Resolver<Maybe<ResolversTypes['RoutineFolder']>, ParentType, ContextType, RequireFields<MutationUpdateRoutineFolderArgs, 'routineFolder'>>;
  addRoutine?: Resolver<Maybe<ResolversTypes['Routine']>, ParentType, ContextType, RequireFields<MutationAddRoutineArgs, 'routine'>>;
  removeRoutine?: Resolver<Maybe<ResolversTypes['Routine']>, ParentType, ContextType, RequireFields<MutationRemoveRoutineArgs, 'id'>>;
  updateRoutine?: Resolver<Maybe<ResolversTypes['Routine']>, ParentType, ContextType, RequireFields<MutationUpdateRoutineArgs, 'routine'>>;
  addWorkoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType, RequireFields<MutationAddWorkoutExerciseArgs, 'workoutExercise'>>;
  removeWorkoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType, RequireFields<MutationRemoveWorkoutExerciseArgs, 'id'>>;
  updateWorkoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutExerciseArgs, 'workoutExercise'>>;
  addWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType>;
  removeWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<MutationRemoveWorkoutArgs, 'id'>>;
  updateWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'workout'>>;
  stopWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<MutationStopWorkoutArgs, 'id'>>;
  addWorkoutSet?: Resolver<Maybe<ResolversTypes['WorkoutSet']>, ParentType, ContextType, RequireFields<MutationAddWorkoutSetArgs, never>>;
  removeWorkoutSet?: Resolver<Maybe<ResolversTypes['WorkoutSet']>, ParentType, ContextType, RequireFields<MutationRemoveWorkoutSetArgs, 'id'>>;
  updateWorkoutSet?: Resolver<Maybe<ResolversTypes['WorkoutSet']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetArgs, never>>;
}>;

export type BodyPartResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyPart'] = ResolversParentTypes['BodyPart']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BodyweightWorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyweightWorkoutSet'] = ResolversParentTypes['BodyweightWorkoutSet']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  repetitions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExerciseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyPart?: Resolver<Maybe<ResolversTypes['BodyPart']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoutineFolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoutineFolder'] = ResolversParentTypes['RoutineFolder']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Routine']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoutineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Routine'] = ResolversParentTypes['Routine']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routineFolder?: Resolver<Maybe<ResolversTypes['RoutineFolder']>, ParentType, ContextType>;
  exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WeightedWorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeightedWorkoutSet'] = ResolversParentTypes['WeightedWorkoutSet']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  repetitions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutExerciseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutExercise'] = ResolversParentTypes['WorkoutExercise']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  exercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType>;
  workout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType>;
  workoutSets?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkoutSet']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutExercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkoutExercise']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSet'] = ResolversParentTypes['WorkoutSet']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BodyweightWorkoutSet' | 'WeightedWorkoutSet', ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  workoutExercise?: Resolver<Maybe<ResolversTypes['WorkoutExercise']>, ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  BodyPart?: BodyPartResolvers<ContextType>;
  BodyweightWorkoutSet?: BodyweightWorkoutSetResolvers<ContextType>;
  Exercise?: ExerciseResolvers<ContextType>;
  RoutineFolder?: RoutineFolderResolvers<ContextType>;
  Routine?: RoutineResolvers<ContextType>;
  WeightedWorkoutSet?: WeightedWorkoutSetResolvers<ContextType>;
  WorkoutExercise?: WorkoutExerciseResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutSet?: WorkoutSetResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
