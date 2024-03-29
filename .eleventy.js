const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginPWA = require('eleventy-plugin-pwa')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const safeLinks = require('eleventy-plugin-safe-external-links')

const filters = require('./eleventy/filters.js')
const transforms = require('./eleventy/transforms.js')

require('dotenv').config()

module.exports = function(config) {
    // Opt out of ignoring .gitignore files
    config.setUseGitIgnore(false)

    // Plugins
    config.addPlugin(pluginRss)
    config.addPlugin(safeLinks)

    // Filters
    Object.keys(filters).forEach(filterName => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transform
    Object.keys(transforms).forEach(transformName => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Collections
    config.addCollection('updates', collection => {
        return collection
            .getAll()
            .filter(item => item.filePathStem.includes('updates/'))
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .reverse()
    })
    config.addCollection('guides', collection => {
        return collection
            .getAll()
            .filter(item => item.filePathStem.includes('guides/'))
            .sort((a, b) => a.data.title.localeCompare(b.data.title))
            .reverse()
    })

    // Markdown
    const mdlib = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: 'anchor',
        permalinkSymbol: '#'
    })
    config.setLibrary('md', mdlib)

    // Layouts
    config.addLayoutAlias('base', 'base.njk')
    config.addLayoutAlias('post', 'post.njk')

    // Pass-through files
    config.addPassthroughCopy('admin')
    config.addPassthroughCopy('src/email')
    config.addPassthroughCopy('src/static')
    config.addPassthroughCopy('src/CNAME')
    config.addPassthroughCopy('src/robots.txt')

    // Deep-Merge
    config.setDataDeepMerge(true)

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
}
