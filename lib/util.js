import { parse } from "yaml";
import { findKey } from "lodash";

export function parseConfig(content) {
  try {
    return parse(content);
  } catch (error) {
    console.log(error);
  }
}

export function hasAssignee(config, assignee) {
  const matched = findKey(config, (_, key) => {
    return assignee.match(new RegExp(key));
  });

  if (matched) {
    return true;
  }

  return false;
}

export function getReviewers(config, assignee) {
  const matched = findKey(config, (_, key) => {
    return assignee.match(new RegExp(key));
  });

  if (matched) {
    return config[matched];
  }

  return [];
}
