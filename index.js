const fs = require('fs')

function writeHeader() {
  return '# ricosmall'
}

function writeContent() {
  const weekday = getWeekdayOfToday()
  return `Today is ${weekday}.`
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

function main() {
  const pageContent = [writeHeader, writeContent]
    .map((fn) => {
      return fn()
    })
    .join(writeBlankLine(2))
    .concat(writeBlankLine())
  fs.writeFileSync('README.md', pageContent)
}

main()
