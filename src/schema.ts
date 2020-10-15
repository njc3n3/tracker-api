import {gql, IResolvers} from 'apollo-server'
import {Category, Exercise, Routine, RoutineFolder, Workout, WorkoutExercise, WorkoutSet} from './models'
import {filterOutFalsies} from './utils'

export const typeDefs = gql`
  ### ROUTINE_FOLDER ###
  "Organizes Routines"
  type RoutineFolder {
    id: ID
    name: String
    routines: [Routine]
  }

  input RoutineFolderCreateInput {
    name: String!
  }

  input RoutineFolderUpdateInput {
    id: ID!
    name: String
  }

  ### ROUTINE ###
  "Acts as scaffolding for creating Workouts"
  type Routine {
    id: ID
    name: String
    notes: String
    routineFolder: RoutineFolder
    exercises: [Exercise]
  }

  input RoutineCreateInput {
    name: String!
    notes: String
    routineFolderId: ID
    exerciseIds: [ID]
  }

  input RoutineUpdateInput {
    id: ID!
    name: String
    notes: String
    routineFolderId: ID
    exerciseIds: [ID]
  }

  ### CATEGORY ###
  "Organizes Exercises for reference"
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
  "Exercise related data for reference in other objects"
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

  ### WORKOUT ###
  "Contains a collection of WorkoutExercises as well as time data for workout length calculation"
  type Workout {
    id: ID
    startTime: String
    endTime: String
    workoutExercises: [WorkoutExercise]
  }

  input WorkoutUpdateInput {
    id: ID!
    startTime: String
    endTime: String
  }

  ### WORKOUT_EXERCISE ###
  "A Workout specific exercise object used for tracking WorkoutSets"
  type WorkoutExercise {
    id: ID
    exercise: Exercise
    workout: Workout
    workoutSets: [WorkoutSet]
  }

  input CreateWorkoutExerciseInput { # Switched naming pattern to prevent Apollo errors
    exerciseId: ID!
    workoutId: ID!
  }

  input UpdateWorkoutExerciseInput { # Switched naming pattern to prevent Apollo errors
    exerciseId: ID
    workoutId: ID
  }

  ### WORKOUT_SET ###
  "Used to track weight, repetitions, time"
  type WorkoutSet {
    id: ID
    weight: Float
    repetitions: Int
    workoutExercise: WorkoutExercise
  }

  input WorkoutSetCreateInput {
    weight: Float
    repetitions: Int
    workoutExerciseId: ID!
  }

  input WorkoutSetUpdateInput {
    id: ID!
    weight: Float
    repetitions: Int
    workoutExerciseId: ID
  }

  ### QUERY ###
  type Query {
    # ROUTINE_FOLDER
    routineFolder(id: ID!): RoutineFolder
    routineFolders: [RoutineFolder]
    # ROUTINE
    routine(id: ID!): Routine
    routines(routineFolderId: ID): [Routine]
    # CATEGORY
    category(id: ID!): Category
    categories: [Category]
    # EXERCISE
    exercise(id: ID!): Exercise
    exercises(categoryId: ID!): [Exercise]
    # WORKOUT
    workout(id: ID!): Workout
    workouts: [Workout]
    # WORKOUT_EXERCISE
    workoutExercise(id: ID!): WorkoutExercise
    workoutExercises(workoutId: ID!): [WorkoutExercise]
    # WORKOUT_SET
    workoutSet(id: ID!): WorkoutSet
    workoutSets(workoutExerciseId: ID!): [WorkoutSet]
  }

  ### MUTATION ###
  type Mutation {
    # ROUTINE_FOLDER
    addRoutineFolder(routineFolder: RoutineFolderCreateInput!): RoutineFolder
    removeRoutineFolder(id: ID!): RoutineFolder
    updateRoutineFolder(routineFolder: RoutineFolderUpdateInput!): RoutineFolder
    # ROUTINE
    addRoutine(routine: RoutineCreateInput!): Routine
    removeRoutine(id: ID!): Routine
    updateRoutine(routine: RoutineUpdateInput!): Routine
    # CATEGORY
    addCategory(category: CategoryCreateInput!): Category
    removeCategory(id: ID!): Category
    updateCategory(category: CategoryUpdateInput!): Category
    # EXERCISE
    addExercise(exercise: ExerciseCreateInput!): Exercise
    removeExercise(id: ID!): Exercise
    updateExercise(exercise: ExerciseUpdateInput!): Exercise
    # WORKOUT
    addWorkout: Workout
    removeWorkout(id: ID!): Workout
    updateWorkout(workout: WorkoutUpdateInput!): Workout
    stopWorkout(id: ID!): Workout
    # WORKOUT_EXERCISE
    addWorkoutExercise(workoutExercise: CreateWorkoutExerciseInput!): WorkoutExercise
    removeWorkoutExercise(id: ID!): WorkoutExercise
    updateWorkoutExercise(workoutExercise: UpdateWorkoutExerciseInput!): WorkoutExercise
    # WORKOUT_SET
    addWorkoutSet(workoutSet: WorkoutSetCreateInput!): WorkoutSet
    removeWorkoutSet(id: ID!): WorkoutSet
    updateWorkoutSet(workoutSet: WorkoutSetUpdateInput!): WorkoutSet
  }
`

export const resolvers: IResolvers<any, any> = {
  Query: {
    // ROUTINE_FOLDER
    routineFolder: (_parent, args) => RoutineFolder.findById(args.id),
    routineFolders: () => RoutineFolder.find(),
    // ROUTINE
    routine: (_parent, args) => Routine.findById(args.id),
    routines: (_parent, args) => Routine.find(args.routineFolderId ? {routineFolderId: args.routineFolderId} : {}),
    // CATEGORY
    category: (_parent, args) => Category.findById(args.id),
    categories: () => Category.find(),
    // EXERCISE
    exercise: (_parent, args) => Exercise.findById(args.id),
    exercises: (_parent, args) => Exercise.find({categoryId: args.categoryId}),
    // WORKOUT
    workout: (_parent, args) => Workout.findById(args.id),
    workouts: () => Workout.find(),
    // WORKOUT_EXERCISE
    workoutExercise: (_parent, args) => WorkoutExercise.findById(args.id),
    workoutExercises: (_parent, args) => WorkoutExercise.find({workoutId: args.workoutId}),
    // WORKOUT_SET
    workoutSet: (_parent, args) => WorkoutSet.findById(args.id),
    workoutSets: (_parent, args) => WorkoutSet.find({workoutExerciseId: args.workoutExerciseId})
  },
  Mutation: {
    // ROUTINE_FOLDER
    addRoutineFolder: (_parent, args) => {
      const routineFolder = new RoutineFolder({
        ...args.routineFolder
      })
      return routineFolder.save()
    },
    removeRoutineFolder: (_parent, args) => {
      // TODO: Remove routineFolderId field from all Routines in that folder
      return RoutineFolder.findByIdAndDelete(args.id)
    },
    updateRoutineFolder: (_parent, args) => {
      const {id, name} = args.routineFolder
      return RoutineFolder.findByIdAndUpdate({_id: id}, filterOutFalsies({name}), {new: true})
    },
    // ROUTINE
    addRoutine: (_parent, args) => {
      const routine = new Routine({
        ...args.routine
      })
      return routine.save()
    },
    removeRoutine: (_parent, args) => {
      return Routine.findByIdAndDelete(args.id)
    },
    updateRoutine: (_parent, args) => {
      const {id, name, notes, routineFolderId, exerciseIds} = args.routine
      return Routine.findByIdAndUpdate({_id: id}, filterOutFalsies({name, notes, routineFolderId, exerciseIds}), {
        new: true
      })
    },
    // CATEGORY
    addCategory: (_parent, args) => {
      const category = new Category({
        ...args.category
      })
      return category.save()
    },
    removeCategory: (_parent, args) => {
      Exercise.deleteMany(
        {categoryId: args.id},
        // tslint:disable-next-line: no-empty
        () => {} // Mongoose won't delete without a return function
      )
      return Category.findByIdAndDelete(args.id)
    },
    updateCategory: (_parent, args) => {
      const {id, name, desc} = args.category
      return Category.findByIdAndUpdate({_id: id}, filterOutFalsies({name, desc}), {new: true})
    },
    // EXERCISE
    addExercise: (_parent, args) => {
      const exercise = new Exercise({
        ...args.exercise
      })
      return exercise.save()
    },
    removeExercise: (_parent, args) => Exercise.findByIdAndDelete(args.id),
    updateExercise: (_parent, args) => {
      const {id, name, desc, categoryId} = args.exercise
      return Exercise.findByIdAndUpdate({_id: id}, filterOutFalsies({name, desc, categoryId}), {new: true})
    },
    // WORKOUT
    addWorkout: () => {
      const workout = new Workout({
        startTime: new Date()
      })
      return workout.save()
    },
    removeWorkout: (_parent, args) => {
      WorkoutExercise.find({workoutId: args.id}).then((workoutExercises) => {
        workoutExercises.forEach((workoutExercise) => {
          WorkoutSet.deleteMany(
            {workoutExerciseId: workoutExercise.id},
            // tslint:disable-next-line: no-empty
            () => {} // Mongoose won't delete without a return function
          )
        }),
          WorkoutExercise.deleteMany(
            {workoutId: args.id},
            // tslint:disable-next-line: no-empty
            () => {} // Mongoose won't delete without a return function
          )
      })
      return Workout.findByIdAndDelete(args.id)
    },
    updateWorkout: (_parent, args) => {
      const {id, startTime, endTime} = args.workout
      return Workout.findByIdAndUpdate({_id: id}, filterOutFalsies({startTime, endTime}), {new: true})
    },
    stopWorkout: (_parent, args) => {
      return Workout.findByIdAndUpdate({_id: args.id}, {endTime: new Date()}, {new: true})
    },
    // WORKOUT_EXERCISE
    addWorkoutExercise: (_parent, args) => {
      const workoutExercise = new WorkoutExercise({
        ...args.workoutExercise
      })
      return workoutExercise.save()
    },
    removeWorkoutExercise: (_parent, args) => {
      WorkoutSet.deleteMany(
        {workoutExerciseId: args.id},
        // tslint:disable-next-line: no-empty
        () => {} // Mongoose won't delete without a return function
      )
      return WorkoutExercise.findByIdAndDelete(args.id)
    },
    updateWorkoutExercise: (_parent, args) => {
      const {id, exerciseId, workoutId} = args.workoutExercise
      return WorkoutExercise.findByIdAndUpdate({_id: id}, filterOutFalsies({exerciseId, workoutId}), {new: true})
    },
    // WORKOUT_SET
    addWorkoutSet: (_parent, args) => {
      const workoutSet = new WorkoutSet({
        ...args.workoutSet
      })
      return workoutSet.save()
    },
    removeWorkoutSet: (_parent, args) => WorkoutSet.findByIdAndDelete(args.id),
    updateWorkoutSet: (_parent, args) => {
      const {id, weight, repetitions, workoutExerciseId} = args.workoutSet
      return WorkoutSet.findByIdAndUpdate({_id: id}, filterOutFalsies({weight, repetitions, workoutExerciseId}), {
        new: true
      })
    }
  },
  RoutineFolder: {routines: (parent) => Routine.find({routineFolderId: parent.id})},
  Routine: {
    routineFolder: (parent) => RoutineFolder.findById(parent.routineFolderId),
    exercises: (parent) => parent?.exerciseIds?.map((exerciseId: string) => Exercise.findById(exerciseId))
  },
  Category: {exercises: (parent) => Exercise.find({categoryId: parent.id})},
  Exercise: {category: (parent) => Category.findById(parent.categoryId)},
  Workout: {
    workoutExercises: (parent) => WorkoutExercise.find({workoutId: parent.id})
  },
  WorkoutExercise: {
    exercise: (parent) => Exercise.findById(parent.exerciseId),
    workout: (parent) => Workout.findById(parent.workoutId),
    workoutSets: (parent) => WorkoutSet.find({workoutExerciseId: parent.id})
  },
  WorkoutSet: {
    workoutExercise: (parent) => WorkoutExercise.findById(parent.workoutExerciseId)
  }
}
