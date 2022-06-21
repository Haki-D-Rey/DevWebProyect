/***
 *
 * @param {any[]} paramList
 * @param {any} req
 * @returns {any[]}
 *
 */
export const validateParams = (paramList = [], req) => {
  const response = {};
  const invalid = [];
  paramList.forEach((e) => {
    if (typeof req[e.param][e.name] != e.type && !e.optional) {
      invalid.push(req[e.param][e.name]);
      return;
    }
    response[e.name] = req[e.param][e.name];
  });
  return [invalid, response];
};
