import mongoose from 'mongoose'
import {ApolloServer} from 'apollo-server'
import {typeDefs, resolvers} from './schema'

mongoose.connect(`mongodb://tracker:${process.env.TRACKER_DB_PW}@ds147942.mlab.com:47942/lift-tracker-gql`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.connection.once('open', () => {
  // tslint:disable-next-line: no-console
  console.log('Connected to database')
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // TODO remove when released
  playground: true // TODO remove when released
})

// TODO add NODE_ENV to heroku
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`)
})
