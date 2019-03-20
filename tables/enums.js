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

module.exports = {
  StatusEnum,
  RoleEnum,
};
