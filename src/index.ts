import mongoose from 'mongoose';
import {ApolloServer} from 'apollo-server';
import {typeDefs, resolvers} from './schema';

mongoose.connect(
  'mongodb://tracker:tracker123@ds147942.mlab.com:47942/lift-tracker-gql', // TODO replace with environment variables and new username and password
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);
mongoose.connection.once('open', () => {
  // tslint:disable-next-line: no-console
  console.log('Connected to database');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // TODO turn off when released
  playground: true, // TODO turn off when released
});

server.listen().then(({url}) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`);
});
