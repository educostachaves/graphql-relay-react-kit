import mongoose from 'mongoose';
import expressGraphql from 'express-graphql';
import express from 'express';
import keystone from 'keystone';

const app = express();
const port = process.env.PORT || 9000;

if (process.env.NODE_ENV != 'production') mongoose.set('debug', true);

keystone.set('app', app);
keystone.set('mongoose', mongoose);

keystone.init({
  'name': 'chimera',
  'brand': 'Descomplica',
  'port': port,
  'mongo': process.env.DB || 'mongodb://localhost/chimera-dev',
  'favicon': 'public/favicon.ico',
  'view engine': 'jade',
  'updates': '../db/updates',
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'AdminUser',
  'cookie secret': process.env.COOKIE_SECRET || 'AcX&FL<VClMida+_vQf$IH$Mg"MFK*4=3O9Hku*`]u1(e=ly.:3thM9K.9yyrE#"'
});

keystone.import('./model');
keystone.start();

app.use('/graphql', expressGraphql({
  schema: require('./types/chimera-schema'),
  graphiql: true
}));

console.log(`chimera started on port: ${port}`);
