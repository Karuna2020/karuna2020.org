const fs = require('fs')
const { join } = require('path')

console.log('Setting up open data')

fs.mkdirSync(join('.', 'src', 'data', 'open-data'), { recursive: true })
fs.copyFileSync(
    join('.', 'open-data', 'summary.json'),
    join('.', 'src', 'data', 'data', 'summary.json')
)
fs.copyFileSync(
    join('.', 'open-data', 'amount-received.json'),
    join('.', 'src', 'data', 'data', 'amount-received.json')
)
