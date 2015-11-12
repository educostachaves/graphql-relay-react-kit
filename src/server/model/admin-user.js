import keystone from 'keystone';
const Types = keystone.Field.Types;

const AdminUser = new keystone.List('AdminUser');

AdminUser.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

AdminUser.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

AdminUser.defaultColumns = 'name, email, isAdmin';
AdminUser.register();

export default AdminUser.model;
