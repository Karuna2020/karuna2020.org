const { DateTime } = require('luxon')
const CleanCSS = require('clean-css')

module.exports = {
    dateToFormat: function(date, format) {
        return DateTime.fromJSDate(date, { zone: 'Asia/Kolkata' }).toFormat(
            String(format)
        )
    },

    dateToISO: function(date) {
        return DateTime.fromJSDate(date, { zone: 'Asia/Kolkata' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    cssmin: function(css) {
        return new CleanCSS({ level: 2 }).minify(css).styles
    },

    numberify: function(number) {
        return parseInt(number).toLocaleString('en-IN')
    }
}
