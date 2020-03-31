const { writeJson, mkdirp } = require("fs-extra")
const { join } = require("path")
const got = require("got")

const updateVersion = async () => {
  const { body } = await got.get(
    "https://api.github.com/repos/Karuna2020/open-data/commits",
    {
      responseType: "json",
      headers: {
        "User-Agent": "Karuna2020",
      },
    }
  )
  const mostRecentCommitHash = body[0].sha
  await writeJson(
    join(".", "content", "mostRecentCommitHash.json"),
    mostRecentCommitHash
  )
}

updateVersion()
