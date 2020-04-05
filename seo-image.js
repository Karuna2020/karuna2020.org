const fs = require('fs')
const nodeHtmlToImage = require('node-html-to-image')
const { join } = require('path')

fs.mkdirSync(join('.', 'dist', 'seo-images'), { recursive: true })

// https://gist.github.com/kethinov/6658166
var walkSync = function(dir, filelist) {
    if (!dir.endsWith('/')) dir += '/'
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir)
    filelist = filelist || []
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist)
        } else {
            filelist.push(dir + file)
        }
    })
    return filelist
}

const generate = async () => {
    const files = walkSync(join('.', 'dist', 'updates'))
    for await (const file of files) {
        const fileName =
            file.replace('/index.html', '').replace(/\//g, '_') + '.png'
        const html = fs.readFileSync(file).toString()
        console.log(file)

        const title = html
            .split('<title>')[1]
            .split('</title>')[0]
            .split(' | ')[0]

        let image = ''
        try {
            const images = html
                .split('\n')
                .filter(line => line.startsWith('<p><img src="'))
            const lastImage = images.pop()
            image = lastImage.split('src="')[1].split('"')[0]
        } catch (error) {}

        await nodeHtmlToImage({
            output: join('dist', 'seo-images', fileName),
            html: `<html>
              <head>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                    width: 1200px;
                    padding: 100px;
                    margin: 0;
                    box-sizing: border-box;
                    height: 630px;
                    font-size: 24px;
                    font-family: sans-serif;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #c00058;
                    color: #fff;
                  }
                  img {
                    height: 100px;
                    margin-right: 40px;
                  }
                  body > div > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  div {
                    font-size: 70px;
                  }
                  h1 {
                    font-size: 100px;
                  }
                  .backgroundimage {
                    position: absolute;
                    left: 0; right: 0;
                    top: 0; bottom: 0;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: top center;
                    opacity: 0.75;
                    z-index: -1;
                  }
                </style>
              </head>
              <body>
                  <div>
                    <h1>${title}</h1>
                    <div>
                      <img alt="" src="https://cdn.karuna2020.org/icon-white.svg">
                      <div>Karuna 2020</div>
                    </div>
                  </div>
                  ${
                      image
                          ? `<div class="backgroundimage" style="background-image: url('${image}')">`
                          : ''
                  }
              </body>
            </html>`
        })

        console.log(fileName)
        fs.writeFileSync(
            file,
            fs
                .readFileSync(file)
                .toString()
                .replace(
                    '</title>',
                    '<title><meta name="twitter:image" content="https://karuna2020.org/seo-images/' +
                        fileName +
                        '"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image" content="https://karuna2020.org/seo-images/' +
                        fileName +
                        '">'
                )
        )
    }
}

generate()
