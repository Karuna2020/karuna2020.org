import React, { useState, useEffect } from "react"
import { SEO, Image } from "../components/elements"
import { Footer } from "../components/sections"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import summary from "../../content/summary.json"

import "../styles/common.scss"
import "../styles/index.scss"
import { Link } from "gatsby"

const IndexPage = () => {
  const [totalRaised, setTotalRaised] = useState(summary.totalAmountRaised)
  const [contributors, setContributors] = useState(summary.numberOfContributors)
  const [volunteers, setVolunteers] = useState(summary.numberOfVolunteers)
  const [totalAmount, setTotalAmount] = useState(0)
  const [kitItems, setKitItems] = useState([])

  useEffect(() => {
    fetch(
      `https://open-data.karuna2020.org/summary.json?v=${new Date().getTime()}`
    )
      .then(response => response.json())
      .then(json => {
        if (json.totalAmountRaised) setTotalRaised(json.totalAmountRaised)
        if (json.numberOfContributors)
          setContributors(json.numberOfContributors)
        if (json.numberOfVolunteers) setVolunteers(json.numberOfVolunteers)
      })
      .catch(() => {})
    fetch(
      `https://open-data.karuna2020.org/material-list.json?v=${new Date().getTime()}`
    )
      .then(response => response.json())
      .then(items => {
        const data = []
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.item === "Total" && item.totalCosts) {
            setTotalAmount(parseInt(item.totalCosts))
            break
          }
          if (item.quanitiy && item.rate && item.totalCosts) data.push(item)
        }
        setKitItems(data)
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
          <Link to="/volunteers">Volunteer for Karuna 2020 &rarr;</Link>
          <a
            href="https://www.facebook.com/Karuna2020.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Follow us on </span>
            <FontAwesomeIcon
              className="smo-icon"
              title="Facebook"
              icon={faFacebook}
            />
          </a>
        </div>
        <section className="numbers">
          <h1>Karuna 2020 in numbers</h1>
          <div className="data">
            <Link to="/contributors">
              <div>₹{totalRaised.toLocaleString()}</div>
              <div>Total raised</div>
            </Link>
            <Link to="/contributors">
              <div>{contributors.toLocaleString()}</div>
              <div>Contributors</div>
            </Link>
            <Link to="/volunteers">
              <div>{volunteers.toLocaleString()}</div>
              <div>Volunteers</div>
            </Link>
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
        <section className="kit">
          <h1>Karuna 2020 Dry Ration Pack</h1>
          <div>
            <ul>
              {kitItems.map((i, x) => (
                <li key={i.item + x}>
                  <span>{i.item}</span>
                  <span></span>
                </li>
              ))}
            </ul>
            <div>
              <p>
                For just ₹{(750).toLocaleString()}, our food and wellness kit
                can feed a family for a whole month. Do your part — contribute
                generously.
              </p>
              <div className="buttons">
                <Link to="/contributors">Sponsor a kit &rarr;</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default IndexPage
