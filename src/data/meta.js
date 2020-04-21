require('dotenv').config()
const {
    META_TITLE,
    META_URL,
    META_DESC,
    META_LANG,
    META_COLOR,
    META_EMAIL,
    META_TELEPHONE
} = process.env

module.exports = {
    title: META_TITLE || 'Karuna 2020',
    url: META_URL || '',
    description:
        META_DESC ||
        'Karuna 2020 is an initiative to do our part in helping feed those most affected during COVID-19 in India.',
    lang: META_LANG || 'en',
    primaryColor: META_COLOR || '#c00058',
    email: META_EMAIL || undefined,
    telephone: META_TELEPHONE || undefined,
    dateFormat: 'LLLL d, yyyy'
}
