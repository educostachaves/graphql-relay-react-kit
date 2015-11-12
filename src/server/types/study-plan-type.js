import co from 'co';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import oneToMany from './helpers/one-to-many';
import manyToMany from './helpers/many-to-many';

import StudyPlan from '../model/study-plan';
import Module from '../model/module';

import ModuleType from '../type/module-type';

const StudyPlanType = new GraphQLObjectType({
  name: 'StudyPlanType',
  description: 'StudyPlanType',
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
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
    parentStudyPlanId: {
      type: GraphQLString
    },
    extraContentUrl: {
      type: GraphQLString
    },
    studyPlans: oneToMany(StudyPlan, StudyPlanType),
    moduleIds: {
      type: new GraphQLList(GraphQLString)
    },
    modules: manyToMany(Module, ModuleType)
  })
});

export default StudyPlanType;
