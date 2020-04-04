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

const socialMediaData = JSON.parse(
    fs.readFileSync(join('.', 'open-data', 'social-media-outreach.json'))
)
const websiteData = socialMediaData.filter(i =>
    ['Publish to website'].includes(i.status)
)
fs.writeFileSync(
    join('.', 'src', 'data', 'data', 'updates.json'),
    JSON.stringify(websiteData)
)
