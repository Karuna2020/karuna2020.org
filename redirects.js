const fs = require('fs')
const { join } = require('path')

const redirects = fs
    .readFileSync(join('.', 'redirects.yml'))
    .toString()
    .split('\n')
    .filter(i => i.startsWith('-'))
    .map(i =>
        i
            .replace('-', '')
            .trim()
            .split(' ')
    )

redirects.forEach(redirect => {
    const from = redirect[0]
    const to = redirect[1].startsWith('/')
        ? `https://karuna2020.org${redirect[1]}`
        : redirect[1]
    fs.writeFileSync(
        join('.', 'dist', from, 'index.html'),
        `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script type="text/javascript">
        window.location.href = "${to}";
    </script>
</head>
<body>
    <p><a href="${to}">If you're not redirected, click here</a></p>
</body>
</html>`
    )
})
