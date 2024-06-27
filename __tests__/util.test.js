const { parseConfig, hasAssignee, getReviewers } = require("../lib/util");
const fs = require("fs");

test("config parser", async () => {
  const content = fs.readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });
  const config = parseConfig(content);
  expect(config["shufo"]).toMatchObject(["shufo2"]);
});

test("assignee matching", async () => {
  const content = fs.readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });

  const config = parseConfig(content);

  expect(hasAssignee(config, "shufo")).toBeTruthy();

  // fallback
  expect(hasAssignee(config, "john")).toBeTruthy();
});

test("get reviewers", async () => {
  const content = fs.readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });

  const config = parseConfig(content);

  expect(getReviewers(config, "shufo")).toMatchObject(["shufo2"]);
});
