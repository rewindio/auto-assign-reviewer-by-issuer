const yaml = require("yaml");
const _ = require("lodash");

const parseConfig = function (content) {
  try {
    return yaml.parse(content);
  } catch (error) {
    console.log(error);
  }
};

const hasAssignee = function (config, assignee) {
  const matched = _.findKey(config, (_, key) => {
    return assignee.match(new RegExp(key));
  });

  if (matched) {
    return true;
  }

  return false;
};

const getReviewers = function (config, assignee) {
  const matched = _.findKey(config, (_, key) => {
    return assignee.match(new RegExp(key));
  });

  if (matched) {
    return config[matched];
  }

  return [];
};

module.exports = {
  parseConfig: parseConfig,
  hasAssignee: hasAssignee,
  getReviewers: getReviewers,
};
