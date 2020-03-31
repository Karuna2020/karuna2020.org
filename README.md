<h1><img alt="" src="https://cdn.karuna2020.org/icon-colored.svg" height="29">&nbsp; Karuna 2020</h1>

This is the website for Karuna 2020: https://karuna2020.org

[![Build status](https://img.shields.io/github/workflow/status/Karuna2020/karuna2020.org/Build%20site?label=Build%20CI&logo=github)](https://github.com/Karuna2020/karuna2020.org/actions)
[![Dependencies](https://img.shields.io/david/Karuna2020/karuna2020.org)](https://david-dm.org/Karuna2020/karuna2020.org)
[![GitHub](https://img.shields.io/github/license/Karuna2020/karuna2020.org)](https://github.com/Karuna2020/karuna2020.org/blob/master/LICENSE)
[![Uptime status](https://img.shields.io/uptimerobot/status/m784633154-5979e255bd05fba09d895960)](https://stats.uptimerobot.com/m29YvtjqOg/784633154)
[![Uptime ratio](https://img.shields.io/uptimerobot/ratio/7/m784633154-5979e255bd05fba09d895960)](https://stats.uptimerobot.com/m29YvtjqOg/784633154)

## 💡 How it works

1. Every day, [GitHub Actions](https://github.com/Karuna2020/karuna2020.org/blob/master/.github/workflows/build-site.yml) triggers a build
2. We fetch data from our [Open data](https://github.com/Karuna2020/open-data) API endpoints
3. The built site is pushed to the [`gh-pages`](https://github.com/Karuna2020/karuna2020.org/tree/gh-pages) branch
4. It is deployed by GitHub Pages on https://karuna2020.org

## 👩‍💻 Development

This website is built with [Gatsby.js](https://www.gatsbyjs.org) and [React](https://reactjs.org).

Start a local development server:

```bash
npm run start
```

Build for production:

```bash
npm run build
```

## 📄 License

- Code: [MIT](./LICENSE)
- Branding and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
