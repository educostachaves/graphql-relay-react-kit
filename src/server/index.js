import mongoose from 'mongoose';
import express from 'express';
import { Schema } from './data/schema';
import graphQLHTTP from 'express-graphql';

mongoose.connect(process.env.DB || 'mongodb://localhost/chimera-dev');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', graphQLHTTP({ schema: Schema, pretty: true, graphiql: true }));
app.listen(9000, (err) => {
  if (err)
    return console.error(err);
  console.log('GraphQL Server is now running on localhost:9000');
});
