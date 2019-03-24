const StatusEnum = {
  validated: 'validated',
  waitingForValidation: 'waitingForValidation',
  removed: 'removed',
  beingWritten: 'beingWritten',
};

const RoleEnum = {
  reader: 'reader',
  writer: 'writer',
  admin: 'admin',
};

const UserStatusEnum = {
  active: 'active',
  inactive: 'inactive',
  banned: 'banned',
};

module.exports = {
  StatusEnum,
  RoleEnum,
  UserStatusEnum,
};
