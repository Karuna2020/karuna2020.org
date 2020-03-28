import React, { useState, useEffect } from "react"
import { SEO, Image } from "../components/elements"
import { Footer } from "../components/sections"

import "../styles/common.scss"
import "../styles/index.scss"

const IndexPage = () => {
  const [totalRaised, setTotalRaised] = useState(0)
  const [contributors, setContributors] = useState(0)
  const [volunteers, setVolunteers] = useState(0)

  useEffect(() => {
    fetch("https://open-data.karuna2020.org/summary.json")
      .then(response => response.json())
      .then(json => {
        if (json.totalAmountRaised) setTotalRaised(json.totalAmountRaised)
        if (json.numberOfContributors)
          setContributors(json.numberOfContributors)
        if (json.numberOfVolunteers) setVolunteers(json.numberOfVolunteers)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <SEO title="Karuna 2020" />
      <main className="container home-main">
        <Image
          className="logo"
          alt="Karuna 2020"
          src="https://cdn.karuna2020.org/logo-vertical.svg"
        />
        <p>
          While many of us will be able to comfortably sustain for months at
          home, there will be millions of people—especially those with limited
          financial means, senior citizens, the differently abled, etc.—who may
          find it very difficult to pull through even for a few days without the
          basic three meals or essential medicines.
        </p>
        <p>
          While the Government is putting significant effort into making the
          lives of its citizens comfortable, what can we do to help?{" "}
          <strong>Karuna 2020</strong> is a small effort to try to bring
          together people and do our part in helping feed those most affected
          during the coronavirus pandemic.
        </p>
        <div className="buttons">
          <a
            href="https://www.facebook.com/Karuna2020.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow our progress on Facebook &rarr;
          </a>
        </div>
        <section className="numbers">
          <h1>Karuna 2020 in numbers</h1>
          <div className="data">
            <div>
              <div>₹{totalRaised.toLocaleString()}</div>
              <div>Total raised</div>
            </div>
            <div>
              <div>{contributors.toLocaleString()}</div>
              <div>Contributors</div>
            </div>
            <div>
              <div>{volunteers.toLocaleString()}</div>
              <div>Volunteers</div>
            </div>
          </div>
          <p>
            We've made all of our data, including contributions, procurement,
            and beneficiaries,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Karuna2020"
            >
              open source
            </a>{" "}
            on GitHub. You can use our{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://open-data.karuna2020.org"
            >
              API
            </a>{" "}
            or contribute to our{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Karuna2020/open-data"
            >
              Open data
            </a>{" "}
            platform.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default IndexPage
