const globals = {
  __basedir: process.cwd(),
};

const testMatch = ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"];

const transform = {
  "^.+\\.js$": "babel-jest",
};

export default { globals, testMatch, transform };
