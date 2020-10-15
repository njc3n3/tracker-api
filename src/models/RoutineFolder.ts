import mongoose, {Schema} from 'mongoose'

const routineFolderSchema = new Schema({
  name: String
})

export const RoutineFolder = mongoose.model('RoutineFolder', routineFolderSchema)
