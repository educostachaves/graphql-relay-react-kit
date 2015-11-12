import _ from 'underscore';
import co from 'co';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import StudyPlan from '../model/study-plan';
import Module from '../model/module';
import Content from '../model/content';

import StudyPlanType from '../type/study-plan-type';
import ModuleType from '../type/module-type';
import ContentType from '../type/content-type';

const queryType = new GraphQLObjectType({
  name: 'chimera',
  fields: {
    studyPlans: {
      type: new GraphQLList(StudyPlanType),
      args: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        urlTitle: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean}
      },
      resolve: (root, args, source) => co(function* () {
        return yield StudyPlan.find(args);
      })
    },
    modules: {
      type: new GraphQLList(ModuleType),
      args: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        urlTitle: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean}
      },
      resolve: (root, args, source) => co(function* (){
        return yield Module.find(args);
      })
    },
    content: {
      type: new GraphQLList(ContentType),
      args: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        urlTitle: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        isFree: {type: GraphQLBoolean},
        contentType: {type: GraphQLString}
      },
      resolve: (root,args, source) => co(function* (){
        return yield Content.find(args);
      })
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStudyPlan: {
      type: StudyPlanType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        urlTitle: {type: new GraphQLNonNull(GraphQLString)},
        isPublished: {type: new GraphQLNonNull(GraphQLBoolean)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        imageUrl: {type: GraphQLString},
        extraContentUrl: {type: GraphQLString},
        parentStudyPlanId: {type: GraphQLString}
      },
      resolve: (rootValue, args) => co(function* () {
        const studyplan = new StudyPlan
        {
          studyplan.name = args.name,
          studyplan.urlTitle = args.urlTitle,
          studyplan.isPublished = args.isPublished,
          studyplan.description = args.description,
          studyplan.imageUrl = args.imageUrl,
          studyplan.parentStudyPlanId = args.parentStudyPlanId
        };
        return yield studyplan.save();
      })
    },
    deleteStudyPlan: {
      type: StudyPlanType,
      args: {
        _id: {type: GraphQLString},
        urlTitle: {type: GraphQLString}
      },
      resolve: (obj, args, source, fieldASTs) => co(function* () {
        return yield StudyPlan.findOneAndRemove(args);
      })
    },
    updateStudyPlan: {
      type: StudyPlanType,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        urlTitle: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        imageUrl: {type: GraphQLString},
        description: {type: GraphQLString},
        extraContentUrl: {type: GraphQLString},
        modules: {type: new GraphQLList(GraphQLString)},
        parentStudyPlanId: {type: GraphQLString}
      },
      resolve: (obj, args, source, fieldASTs) => co(function* () {
        yield StudyPlan.update({
          _id: args._id
        }, {
          $set: {
            name: args.name,
            urlTitle: args.urlTitle,
            isPublished: args.isPublished,
            imageUrl: args.imageUrl,
            description: args.description,
            modules: args.modules,
            parentStudyPlanId: args.parentStudyPlanId
          }
        });
        return yield StudyPlan.findById(args._id);
      })
    },
    createModule: {
      type: ModuleType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString) },
        description: {type: new GraphQLNonNull(GraphQLString) },
        urlTitle: {type: new GraphQLNonNull(GraphQLString) },
        imageUrl: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        createdDate: {type: GraphQLString},
        recordedDate: {type: GraphQLString},
        publishedDate: {type: GraphQLString},
        isHighlight: {type: GraphQLBoolean},
        status: {type: GraphQLString},
        contentIds: {type: new GraphQLList(GraphQLString)}
      },
      resolve: (rootValue, args) => co(function* () {
        const module = new Module
        {
          module.name = args.name,
          module.description = args.description,
          module.urlTitle = args.urlTitle,
          module.imageUrl = args.imageUrl,
          module.isPublished = args.isPublished,
          module.createdDate = args.createdDate,
          module.recordedDate = args.recordedDate,
          module.publishedDate = args.publishedDate,
          module.isHighlight = args.isHighlight,
          module.status = args.status,
          module.contentIds = args.contentIds
        };
        return yield module.save();
      })
    },
    updateModule: {
      type: ModuleType,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString) },
        description: {type: new GraphQLNonNull(GraphQLString) },
        urlTitle: {type: new GraphQLNonNull(GraphQLString) },
        imageUrl: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        recordedDate: {type: GraphQLString},
        publishedDate: {type: GraphQLString},
        isHighlight: {type: GraphQLBoolean},
        status: {type: GraphQLString},
        contentIds: {type: new GraphQLList(GraphQLString)}
      },
      resolve: (obj, args, source, fieldASTs) => co(function* () {
        yield Module.update({
          _id: args._id
        }, {
          $set: {
            name: args.name,
            description: args.description,
            urlTitle: args.urlTitle,
            imageUrl: args.imageUrl,
            isPublished: args.isPublished,
            recordedDate: args.recordedDate,
            publishedDate: args.publishedDate,
            contentIds: args.contentIds,
            status: args.status
          }
        });
        return yield Module.findById(args._id);
      })
    },
    deleteModule: {
      type: ModuleType,
      args: {
        _id: {type: GraphQLString},
        urlTitle: {type: GraphQLString}
      },
      resolve: (obj, args, source, fieldASTs) => co(function* () {
        return yield Module.findOneAndRemove(args);
      })
    },
    createContent: {
      type: ContentType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        briefDescription: {type: new GraphQLNonNull(GraphQLString)},
        urlTitle: {type: new GraphQLNonNull(GraphQLString)},
        facebookCommentUrl: {type: GraphQLString},
        facebookUrl: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        isFree: {type: GraphQLBoolean},
        status: {type: GraphQLString},
        quantityOfAccesses: {type: GraphQLString},
        contentType: {type: GraphQLString}
      },
      resolve: (rootValue, args) => co(function* () {
        const content = new Content
        {
          content.name = args.name,
          content.description = args.description,
          content.briefDescription = args.briefDescription,
          content.urlTitle = args.urlTitle,
          content.facebookCommentUrl = args.facebookCommentUrl,
          content.facebookUrl = args.facebookUrl,
          content.isPublished = args.isPublished,
          content.isFree = args.isFree,
          content.status = args.status,
          content.quantityOfAccesses = args.quantityOfAccesses,
          content.contentType = args.contentType
        };
        return yield content.save();
      })
    },
    updateContent: {
      type: ContentType,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        briefDescription: {type: new GraphQLNonNull(GraphQLString)},
        urlTitle: {type: new GraphQLNonNull(GraphQLString)},
        facebookCommentUrl: {type: GraphQLString},
        facebookUrl: {type: GraphQLString},
        isPublished: {type: GraphQLBoolean},
        isFree: {type: GraphQLBoolean},
        status: {type: GraphQLString},
        quantityOfAccesses: {type: GraphQLString},
        contentType: {type: GraphQLString}
      },
      resolve: (obj, args, source, fieldASTs) => co(function* () {
        yield Content.update({
          _id: args._id
        }, {
          $set: {
            name: args.name,
            description: args.description,
            briefDescription: args.briefDescription,
            urlTitle: args.urlTitle,
            facebookCommentUrl: args.facebookCommentUrl,
            facebookUrl: args.facebookUrl,
            isPublished: args.isPublished,
            isFree: args.isFree,
            status: args.status,
            quantityOfAccesses: args.quantityOfAccesses,
            contentType: args.contentType
          }
        });
        return yield Content.findById(args._id);
      })
    }
  }
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      chimera: {
        resolve: () => (true),
        type: queryType
      }
    }
  }),
  mutation: mutationType
});
