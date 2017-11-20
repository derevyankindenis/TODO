var utils = (function (exports) {
'use strict';

const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

exports.generateId = generateId;

return exports;

}({}));

//# sourceMappingURL=utils.js.map
