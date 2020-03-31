const { writeJson, mkdirp } = require("fs-extra")
const { join } = require("path")
const got = require("got")

const BASE_URL = "https://open-data.karuna2020.org"

const endpoints = [
  "/summary.json",
  "/amount-received.json",
  "/volunteers.json",
  "/material-list.json",
]

const download = async () => {
  await mkdirp(join(".", "content"))
  for await (const endpoint of endpoints) {
    const {
      body,
    } = await got.get(`${BASE_URL}${endpoint}?v=${new Date().getTime()}`, {
      responseType: "json",
    })
    await writeJson(join(".", "content", endpoint.substr(1)), body, {
      spaces: 2,
    })
  }
}

download()
