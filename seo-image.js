const nodeHtmlToImage = require('node-html-to-image')

nodeHtmlToImage({
    output: './image.png',
    html: '<html><body>Hello world!</body></html>'
}).then(() => console.log('The image was created successfully!'))
