import { exportVariable, getInput, info, setFailed, setOutput } from '@actions/core';

const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;

export class Action {
  async run(): Promise<void> {
    if (!GITHUB_TOKEN) {
      setFailed(`Missing GITHUB_TOKEN environment variable`);
      return;
    }

    const inputKey = getInput('inputKey', { required: true });
    const optionalInputKey = getInput('optionalInputKey', { required: false });

    info(`Input: ${inputKey}`);
    info(`Optional Input: ${optionalInputKey}`);

    if (!GITHUB_REPOSITORY) {
      throw new Error('Missing GITHUB_REPOSITORY environment variable');
    }

    const [org, repo] = GITHUB_REPOSITORY.split('/');
    if (!org || !repo) {
      throw new Error(
        `Unable to parse owner and repo from GITHUB_REPOSITORY environment variable: ${GITHUB_REPOSITORY}`,
      );
    }

    const output = 'hello world';

    exportVariable('OUTPUT', output);
    setOutput('output', output);
  }
}
