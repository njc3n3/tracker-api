import {ApolloServer} from 'apollo-server'
import log4js from 'log4js'
import {schema} from './schema'
import {createContext} from './context'

export const logger = log4js.getLogger()
// TODO: change level based on ENV
logger.level = 'debug'

new ApolloServer({schema, context: createContext}).listen({port: 4000}, () =>
  logger.info(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#using-the-graphql-api`
  )
)
