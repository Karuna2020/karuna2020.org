const fs = require('fs')
const { join } = require('path')

console.log('Setting up open data')

fs.mkdirSync(join('.', 'src', 'data', 'data'), { recursive: true })
fs.copyFileSync(
    join('.', 'open-data', 'summary.json'),
    join('.', 'src', 'data', 'data', 'summary.json')
)
fs.writeFileSync(
    join('.', 'src', 'data', 'data', 'donations.json'),
    JSON.stringify(
        JSON.parse(
            fs.readFileSync(join('.', 'open-data', 'donations.json'))
        ).sort(
            (a, b) =>
                new Date(b.date || 100).getTime() -
                new Date(a.date || 100).getTime()
        )
    )
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
    let updatePhotos = [
        ...(update.cdnImages || '').split(',').map(i => i.trim())
    ]
    if (update.pictures) {
        updatePhotos.push(
            ...update.pictures.sort((a, b) =>
                a.filename.localeCompare(b.filename)
            )
        )
    }
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
    .filter(i => typeof i === 'string' || i.thumbnails)
    .map(
        i =>
            `<img alt="" src="${
                typeof i === 'string' ? i : i.thumbnails.large.url
            }">`
    )
    .join('\n')}
</div>

${
    [
        ...((update.distribution || {}).cdnImages || '')
            .split(',')
            .map(i => i.trim())
    ].filter(i => i).length
        ? `
## Distribution

<div class="distributionimages">
${[
    ...((update.distribution || {}).cdnImages || '')
        .split(',')
        .map(i => i.trim())
]
    .filter(i => i)
    .filter(i => typeof i === 'string' || i.thumbnails)
    .map(
        i =>
            `<img alt="" src="${
                typeof i === 'string' ? i : i.thumbnails.large.url
            }">`
    )
    .join('\n')}
</div>
`
        : ''
}
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
    try {
        const cdnImage = partner.cdnImages
        if (cdnImage) logo = cdnImage
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
