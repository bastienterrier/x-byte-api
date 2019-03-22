function isNullOrEmpty(val) {
  if (typeof val === 'undefined') return true;
  if (val === '' || val === {} || val === []) return true;
}

function nullifyEmptyProperties(obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  Object.getOwnPropertyNames(obj).forEach(key => {
    let value = obj[key];

    if (isNullOrEmpty(value)) {
      newObj[key] = null;
    }
  });

  return newObj;
}

module.exports = {
  isNullOrEmpty,
  nullifyEmptyProperties,
};
