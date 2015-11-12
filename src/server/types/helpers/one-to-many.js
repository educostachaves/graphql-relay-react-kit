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
    const filter = {};
    filter[`parent${camelize(Model.modelName)}Id`] = root._id;
    return yield Model.find(filter);
  })
});
