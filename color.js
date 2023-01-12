const resetCode = "\x1b[0m";
const colorMap = {
  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
};

export function colorLog(text, ...others) {
  console.log(
    text
      .replace(/\<black\>([^]+)\<\/black\>/g, `${colorMap.fgBlack}$1${resetCode}`)
      .replace(/\<red\>([^]+)\<\/red\>/g, `${colorMap.fgRed}$1${resetCode}`)
      .replace(/\<green\>([^]+)\<\/green\>/g, `${colorMap.fgGreen}$1${resetCode}`)
      .replace(/\<yellow\>([^]+)\<\/yellow\>/g, `${colorMap.fgYellow}$1${resetCode}`)
      .replace(/\<blue\>([^]+)\<\/blue\>/g, `${colorMap.fgBlue}$1${resetCode}`)
      .replace(/\<magenta\>([^]+)\<\/magenta\>/g, `${colorMap.fgMagenta}$1${resetCode}`)
      .replace(/\<cyan\>([^]+)\<\/cyan\>/g, `${colorMap.fgCyan}$1${resetCode}`)
      .replace(/\<white\>([^]+)\<\/white\>/g, `${colorMap.fgWhite}$1${resetCode}`),
    ...others
  );
}
