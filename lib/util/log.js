const chalk = require("chalk");
const log = console.log;

export function error(str) {
  log(chalk.bold.red.underline(str));
}

export function success(str) {
  log(chalk.bold.green(str));
}

export function info(str) {
  log(chalk.dim.cyan(str));
}
