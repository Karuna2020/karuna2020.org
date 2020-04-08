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
fs.copyFileSync(
    join('.', 'open-data', 'volunteers.json'),
    join('.', 'src', 'data', 'data', 'volunteers.json')
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

    const distributions = update.linkedDistribution
    if (distributions && distributions.length) {
        distributions.forEach(distribution => {
            try {
                const result = JSON.parse(
                    fs.readFileSync(join('.', 'open-data', 'distribution.json'))
                ).filter(d => d._id === distribution)[0]
                update.distribution = { ...result }
            } catch (error) {}
        })
    }

    if ((update.distribution || {}).deliveredOn || update.date)
        console.log('Adding update', update.event)
    if ((update.distribution || {}).deliveredOn || update.date)
        fs.writeFileSync(
            join(
                '.',
                'src',
                'updates',
                `${update.event
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '')}.md`
            ),
            `---
date: ${(update.distribution || {}).deliveredOn || update.date}
title: ${update.event}
smoImage: ${smoImage}
---

${update.notes}

<div class="mainImages">
${updatePhotos
    .filter(i => i.thumbnails)
    .map(i => `<img alt="" src="${i.thumbnails.large.url}">`)
    .join('\n')}
</div>

## Distribution

<div class="distributionimages">
${((update.distribution || {}).distributionPictures || [])
    .filter(i => i.thumbnails)
    .map(i => `<img alt="" src="${i.thumbnails.large.url}">`)
    .join('\n')}
</div>
`
        )
})

const partnersData = JSON.parse(
    fs.readFileSync(join('.', 'open-data', 'partners.json'))
)
partnersData.forEach(partner => {
    console.log('Adding partner', partner.brandName)
    let logo = ''
    try {
        logo = partner.logo[0].thumbnails.large.url
    } catch (error) {}
    fs.writeFileSync(
        join(
            '.',
            'src',
            'partners',
            `${partner.brandName
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '')}.md`
        ),
        `---
title: ${partner.brandName}${logo ? `\nlogo: ${logo}` : ''}
---

${partner.description || ''}

<a class="cta" href="${partner.website}">Visit ${partner.brandName} →</a>`
    )
})
