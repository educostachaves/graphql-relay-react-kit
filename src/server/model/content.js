import keystone from 'keystone';
const Types = keystone.Field.Types;

const Content = new keystone.List('Content', {
  schema: {
    versionKey: false
  }
});

Content.add({
  name: {type: String, initial: true, required: true},
  description: {type: String, initial: true, required: true},
  briefDescription: {type: String},
  urlTitle: {type: String, initial: true, required: true, index: true},
  facebookCommentUrl: {type: String},
  isPublished: {type: Boolean},
  isFree: {type: Boolean},
  status: {type: String},
  quantityOfAccesses: {type: String},
  contentType: {type: Types.Select, options: ['video', 'text', 'quiz'], initial: true, required: true}
});

Content.defaultColumns = 'name, urlTitle, isPublished';
Content.register();

export default Content.model;
