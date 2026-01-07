const core = require("@actions/core");
const github = require("@actions/github");
const context = github.context;
const got = require('got');
const { parseConfig, hasAssignee, getReviewers } = require("./lib/util");

// most @actions toolkit packages have async methods
async function run() {
  let configContent = '';

  try {
    const token = core.getInput("token", { required: true });
    const configPath = core.getInput("config");
    const octokit = github.getOctokit(token);

    if (configPath.startsWith("http")) {
      console.log(`Reading config from URL...`);
      configContent = await getUrl(configPath);
    } else {
      console.log(`Reading config from local path...`);
      configContent = await fetchContent(octokit, configPath);
    }

    const config = parseConfig(configContent);

    core.debug("config");
    core.debug(JSON.stringify(config));

    const issuer = context.payload.pull_request.user.login;

    if (hasAssignee(config, issuer)) {
      let reviewers = getReviewers(config, issuer);
      await assignReviewers(octokit, reviewers);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function assignReviewers(octokit, reviewers) {
  await octokit.pulls.createReviewRequest({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
    reviewers: reviewers,
  });
}

async function fetchContent(client, repoPath) {
  const response = await client.rest.repos.getContent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    path: repoPath,
    ref: github.context.sha,
  });

  return Buffer.from(response.data.content, response.data.encoding).toString();
}

async function getUrl(url) {
  const response = await got(url);
  return Buffer.from(response.body).toString();
}

run();
