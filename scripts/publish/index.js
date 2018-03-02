const inquirer = require('inquirer');
// const util = require('util');
const { execSync } = require('child_process');


function $(command, opts) {
  execSync(command, { stdio: 'inherit', ...opts });
}

(async () => {
  const { version } = await inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'version type',
    choices: [
      { name: 'Patch (0.0.1)', value: 'patch' },
      { name: 'Minor (0.1.0)', value: 'minor' },
      { name: 'Major (1.0.0)', value: 'major' },
    ],
  });

  $(`npm version ${version}`);
  $('npm run build');
  $('npm publish', { cwd: './packages/littlebird' });
  $('npm publish', { cwd: './packages/littlebird-es' });
})();
