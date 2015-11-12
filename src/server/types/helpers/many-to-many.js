import _ from 'underscore';
import co from 'co';
import camelize from 'camelize';
import {
  GraphQLList,
  GraphQLString
} from 'graphql';

export default (Model, Type) => ({
  type: new GraphQLList(Type),
  args: {
    _id: {type: GraphQLString}
  },
  resolve: (root, args, source) => co(function* () {
    const ids = root[`${camelize(Model.modelName.toLowerCase())}Ids`];
    if (ids.length) {
      const children = yield Model.find({_id: {$in: ids}});
      const byId = _.indexBy(children, '_id');
      return ids.map(_id => (byId[_id]));
    }

    return [];
  })
});
