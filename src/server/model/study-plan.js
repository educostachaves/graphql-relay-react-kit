import keystone from 'keystone';
const Types = keystone.Field.Types;

const StudyPlan = new keystone.List('StudyPlan', {
  schema: {
    versionKey: false
  }
});

StudyPlan.add({
  name: {type: String, initial: true, required: true},
  description: {type: String, initial: true, required: true},
  urlTitle: {type: String, initial: true, required: true, index: true},
  imageUrl: {type: String},
  isPublished: {type: Boolean},
  extraContentUrl: {type: String},
  parentStudyPlanId: {type: Types.Relationship, ref: 'StudyPlan', label: 'Discipline'},
  moduleIds: {type: Types.Relationship, ref: 'Module', many: true, label: 'Modules'}
});

StudyPlan.defaultColumns = 'name, urlTitle, isPublished';
StudyPlan.register();

export default StudyPlan.model;
