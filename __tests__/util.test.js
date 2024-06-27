import { parseConfig, hasAssignee, getReviewers } from "../lib/util";
import { readFileSync } from "fs";

test("config parser", async () => {
  const content = readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });
  const config = parseConfig(content);
  expect(config["shufo"]).toMatchObject(["shufo2"]);
});

test("assignee matching", async () => {
  const content = readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });

  const config = parseConfig(content);

  expect(hasAssignee(config, "shufo")).toBeTruthy();

  // fallback
  expect(hasAssignee(config, "john")).toBeTruthy();
});

test("get reviewers", async () => {
  const content = readFileSync(process.cwd() + "/.github/auto-assigner.yml", {
    encoding: "utf8",
  });

  const config = parseConfig(content);

  expect(getReviewers(config, "shufo")).toMatchObject(["shufo2"]);
});
