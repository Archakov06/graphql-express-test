import express from 'express';
import graphqlHTTP from 'express-graphql';

import './src/core/db';

import schema from './src/graphqlSchema';

let port = 3000;

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(port);
console.log('GraphQL API server running at localhost: ' + port);
