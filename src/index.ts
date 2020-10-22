import mongoose from 'mongoose'
import {ApolloServer} from 'apollo-server'
import log4js from 'log4js'
import {typeDefs, resolvers} from './schema'

export const logger = log4js.getLogger()
// TODO: change level based on ENV
logger.level = 'debug'

// TODO: Change db password
mongoose.connect(
  `mongodb+srv://nicholasjcoffey:CbQA-4wMLfF!YweCZ7r@cluster0.j0ien.mongodb.net/tracker?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  (err) => {
    err && logger.fatal(err)
  }
)
mongoose.connection.once('open', () => {
  logger.info('Connected to database')
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // TODO remove when released
    playground: true // TODO remove when released
  })

  // TODO add NODE_ENV to heroku
  server
    .listen({port: process.env.PORT || 4000})
    .then(({url}) => {
      logger.info(`Server ready at ${url}`)
    })
    .catch((err) => {
      err && logger.fatal(err)
    })
})
