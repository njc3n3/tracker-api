import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(
  'mongodb://tracker:tracker123@ds147942.mlab.com:47942/lift-tracker-gql',
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

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(4000);
// tslint:disable-next-line: no-console
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
