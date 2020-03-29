import React, { useState, useEffect } from "react"
import { SEO } from "../components/elements"
import { Footer, Header } from "../components/sections"

import "../styles/common.scss"
import "../styles/page.scss"

const ContributorsPage = () => {
  const [volunteers, setContributors] = useState([])

  useEffect(() => {
    fetch("https://open-data.karuna2020.org/amount-received.json")
      .then(response => response.json())
      .then(items =>
        setContributors(
          items
            .filter(i => i.amount.trim())
            .map(i => {
              const value = parseInt(i.amount.replace(/\D/g, ""))
              if (!isNaN(value)) {
                i.amount = value
              }
              return i
            })
        )
      )
      .catch(() => {})
  }, [])

  return (
    <>
      <SEO title="Contributors" />
      <Header />
      <main className="container page">
        <section className="kit">
          <h1>Contributors</h1>
          <div>
            <ul>
              {volunteers.map((i, x) => (
                <li key={i.contributorName + x}>
                  <span>{i.contributorName}</span>
                  <span>₹{i.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div>
              <p>
                Karuna 2020 is a small effort to try to bring together people
                and do our part. We need volunteers to take care of procurement,
                cooking management, distribution, fund raising, accounting,
                social media, technology and volunteer management.
              </p>
              <div className="buttons">
                <a href="/example">Become a volunteer &rarr;</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ContributorsPage
