import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import manyToMany from './helpers/many-to-many';

import Content from '../model/content';

import ContentType, {contentCounts} from '../type/content-type';

export default new GraphQLObjectType({
  name: 'ModuleType',
  description: 'ModuleType',
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    urlTitle: {
      type: GraphQLString
    },
    imageUrl: {
      type: GraphQLString
    },
    isPublished: {
      type: GraphQLBoolean
    },
    createdDate: {
      type: GraphQLString
    },
    recordedDate: {
      type: GraphQLString
    },
    publishedDate: {
      type: GraphQLString
    },
    isHighlight: {
      type: GraphQLBoolean
    },
    status: {
      type: GraphQLString
    },
    contentIds: {
      type: new GraphQLList(GraphQLString),
    },
    contents: manyToMany(Content, ContentType),
    contentCounts: contentCounts
  })
});
