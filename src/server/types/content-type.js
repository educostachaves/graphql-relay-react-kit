import co from 'co';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import Content from '../model/content';

export default new GraphQLObjectType({
  name: 'ContentType',
  description: 'ContentType',
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
    briefDescription: {
      type: GraphQLString
    },
    urlTitle: {
      type: GraphQLString
    },
    facebookCommentUrl: {
      type: GraphQLString
    },
    facebookUrl: {
      type: GraphQLString
    },
    isPublished: {
      type: GraphQLBoolean
    },
    isFree: {
      type: GraphQLBoolean
    },
    status: {
      type: GraphQLString
    },
    quantityOfAccesses: {
      type: GraphQLString
    },
    contentType: {
      type: GraphQLString
    }
  })
});

const contentCounts = {
  type: new GraphQLObjectType({
    name: 'contentCounts',
    fields: () => ({
      videos: {type: GraphQLInt},
      texts: {type: GraphQLInt},
      quizzes: {type: GraphQLInt}
    })
  }),
  resolve: (root, args, source) => co(function* () {
    const ids = root.contentIds;
    if (ids.length) {
      const countAggregation = yield Content.aggregate([
        {$match: {_id: {$in: ids}}},
        {$group: {_id: '$contentType', count: {$sum: 1}}}
      ]).exec();
      const counts = {};
      countAggregation.forEach((typeCount) => {
        counts[`${typeCount._id}s`] = typeCount.count
      });
      return counts;
    }
    return {};
  })
};

export {contentCounts};
