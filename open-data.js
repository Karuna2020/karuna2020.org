const fs = require('fs')
const { join } = require('path')

console.log('Setting up open data')

fs.mkdirSync(join('.', 'src', 'data', 'data'), { recursive: true })
fs.copyFileSync(
    join('.', 'open-data', 'summary.json'),
    join('.', 'src', 'data', 'data', 'summary.json')
)
fs.copyFileSync(
    join('.', 'open-data', 'amount-received.json'),
    join('.', 'src', 'data', 'data', 'amount-received.json')
)

fs.readdirSync(join('.', 'open-data', 'guides')).forEach(file =>
    fs.copyFileSync(
        join('.', 'open-data', 'guides', file),
        join('.', 'src', 'guides', file)
    )
)

const socialMediaData = JSON.parse(
    fs.readFileSync(join('.', 'open-data', 'social-media-outreach.json'))
)
const websiteData = socialMediaData.filter(i =>
    ['Publish to website'].includes(i.status)
)

websiteData.forEach(update => {
    const updatePhotos = update.pictures.sort((a, b) =>
        a.filename.localeCompare(b.filename)
    )
    let smoImage = 'https://cdn.karuna2020.org/logo-vertical.svg'
    try {
        smoImage = updatePhotos[0].thumbnails.large.url
    } catch (error) {}

    fs.writeFileSync(
        join(
            '.',
            'src',
            'updates',
            `${update.dateOfOccurence}-${update.event
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '')}.md`
        ),
        `---
date: ${update.dateOfOccurence}
title: ${update.event}
smoImage: ${smoImage}
---

${update.notes}

${updatePhotos.map(i => `![](${i.thumbnails.large.url})`).join('\n\n')}
`
    )
})
