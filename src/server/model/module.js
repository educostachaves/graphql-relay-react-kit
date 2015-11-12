import keystone from 'keystone';
const Types = keystone.Field.Types;

const Module = new keystone.List('Module', {
  schema: {
    versionKey: false
  }
});

Module.add({
  name: {type: String, initial: true, required: true},
  description: {type: String, initial: true, required: true},
  urlTitle: {type: String, initial: true, required: true, index: true},
  imageUrl: {type: String},
  isPublished: {type: Boolean},
  createdDate: {type: Types.Date},
  recordedDate: {type: Types.Date},
  publishedDate: {type: Types.Date},
  isHighlight: {type: Boolean},
  status: {type: String},
  contentIds: {type: Types.Relationship, ref: 'Content', many: true, label: 'Contents'}
});

Module.defaultColumns = 'name, urlTitle, isPublished';
Module.register();

export default Module.model;
