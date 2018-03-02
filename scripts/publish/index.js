const inquirer = require('inquirer');
// const util = require('util');
const spawn = require('child_process').spawn;

spawn('npm', ['version', 'patch'], { stdio: 'inherit' });
// (async function run() {
//   // const { version } = await inquirer.prompt({
//   //   type: 'list',
//   //   name: 'version',
//   //   message: 'version type',
//   //   choices: [
//   //     { name: 'Patch (0.0.1)', value: 'patch' },
//   //     { name: 'Minor (0.1.0)', value: 'minor' },
//   //     { name: 'Major (1.0.0)', value: 'major' },
//   //   ],
//   // });

//   spawn('npm version', '', { stdio: 'inherit' });
// }());
