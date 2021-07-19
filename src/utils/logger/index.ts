import chalk from "chalk";

export const warningLog = (s: string) => {
    console.log(chalk.hex('#FFA500')(s))
} ;
const errorLog = (s: string) => {
    console.log(chalk.bold.red(s))
} ;

const infoLog = (s: string) => {
    console.log(chalk.blueBright.bold(s));
} ;

module.exports = {
    warningLog,
    errorLog,
    infoLog,
}