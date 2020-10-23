import mongoose, {Schema, Document} from 'mongoose'

export interface IBodyPart extends Document {
  id: string
  name: string
}

export interface IBodyPartCreate {
  name: IBodyPart['name']
}

export interface IBodyPartUpdate {
  id: IBodyPart['id']
  name: IBodyPart['name']
}

const bodyPartSchema = new Schema({
  name: {type: String, required: true}
})

export const BodyPart = mongoose.model<IBodyPart>('BodyPart', bodyPartSchema)
