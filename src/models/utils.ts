import mongoose, {Document} from 'mongoose'
import {filterOutFalsies} from '../utils'

interface IBaseUpdateInput {
  id: string
}

export function addOne<T extends Document, Y>(model: mongoose.Model<T, {}>, args: Y) {
  return new model(args).save()
}

export async function findOneById<T extends Document>(model: mongoose.Model<T, {}>, id: string) {
  return await model.findById(id)
}

export async function findAll<T extends Document, Y>(model: mongoose.Model<T, {}>, where?: Y) {
  return await model.find(where ?? {})
}

export async function updateOneById<T extends Document, Y extends IBaseUpdateInput>(
  model: mongoose.Model<T, {}>,
  args: Y
) {
  const {id, ...fields} = args
  return await model.findByIdAndUpdate({_id: id}, filterOutFalsies(fields), {new: true})
}

export async function deleteMany<T extends Document, Y>(model: mongoose.Model<T, {}>, args: Y) {
  return await model.deleteMany(args, () => {} /* Mongoose won't delete without a return function */)
}

export async function deleteOneById<T extends Document>(model: mongoose.Model<T, {}>, id: string) {
  return await model.findByIdAndDelete(id)
}
