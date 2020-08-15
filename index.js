const fs = require('fs')
const getWeather = require('./weather')

function writeHeader() {
  return '# ricosmall'
}

function writeWeekday() {
  const weekday = getWeekdayOfToday()
  return `Today is ${weekday}.`
}

function writeGitHubStats() {
  return `<img src="https://github-readme-stats.vercel.app/api?username=ricosmall&show_icons=true" />`
}

function getWeekdayOfToday() {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const index = new Date().getDay()
  return weekdays[index]
}

function writeBlankLine(times = 1) {
  return '\n'.repeat(times)
}

async function main() {
  const writeTasks = [writeHeader, writeWeekday, getWeather, writeGitHubStats]
  const writeContent = await writeTasks.reduce(async (result, curr) => {
    const arr = await result
    const str = await curr()
    arr.push(str)
    return arr
  }, [])
  const pageContent = writeContent
    .join(writeBlankLine(2))
    .concat(writeBlankLine())
  fs.writeFileSync('README.md', pageContent)
}

main()
