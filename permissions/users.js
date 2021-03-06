const AccessControl = require('role-acl');
const ac = new AccessControl();

//user permission
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
  .on('user', ['*', '!password', '!passwordSalt']);
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update')
  .on('user', ['firstName', 'lastName', 'about', 'password', 'email', 'avatarURL']);

//staff permission
ac.grant('staff').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
  .on('staff', ['*', '!password', '!passwordSalt']);
ac.grant('staff').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
  .on('user', ['*', '!password', '!passwordSalt']);
ac.grant('staff').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update')
  .on('staff', ['firstName', 'lastName', 'about', 'password', 'email', 'avatarURL']);
ac.grant('staff').execute('update').on('user');



ac.grant('admin').execute('read').on('staff');
ac.grant('admin').execute('update').on('staff');

ac.grant('admin').execute('read').on('user');
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('update').on('user');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('user');


exports.readAll = (requester) =>
ac.can(requester.role).execute('read').sync().on('users');

exports.staff = (requester) =>
ac.can(requester.role).execute('read').sync().on('staff');


exports.read = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user');

exports.update = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user');

exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user');
