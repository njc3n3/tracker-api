import mongoose, {Schema, Document} from 'mongoose'

enum Category {
  Weighted = 'Weighted',
  Bodyweight = 'Bodyweight',
  WeightedBodyweight = 'WeightedBodyweight',
  AssistedBodyWeight = 'AssistedBodyWeight',
  Duration = 'Duration'
}

export interface IExercise extends Document {
  id: string
  name: string
  desc?: string
  bodyPartId: string
  category: Category
}

export interface IExerciseCreate {
  name: IExercise['name']
  desc?: IExercise['desc']
  bodyPartId: IExercise['bodyPartId']
  category: IExercise['category']
}

export interface IExerciseUpdate {
  id: IExercise['id']
  name?: IExercise['name']
  desc?: IExercise['desc']
  bodyPartId?: IExercise['bodyPartId']
  category?: IExercise['category']
}

export interface IExerciseWhere {
  name?: IExercise['name']
  desc?: IExercise['desc']
  bodyPartId?: IExercise['bodyPartId']
  category?: IExercise['category']
}

const exerciseSchema = new Schema({
  name: {type: String, required: true},
  desc: String,
  bodyPartId: {type: String, required: true},
  category: {type: String, required: true}
})

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema)
