import React, { useState, useEffect } from "react"
import { SEO } from "../components/elements"
import { Footer, Header } from "../components/sections"

import "../styles/common.scss"
import "../styles/page.scss"

const ContributorsPage = () => {
  const [volunteers, setContributors] = useState([])

  useEffect(() => {
    fetch(
      `https://open-data.karuna2020.org/amount-received.json?v=${new Date().getTime()}`
    )
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
                <strong>Contribute to</strong>
              </p>
              <ul>
                <li>
                  <strong>Name of account:</strong> Integral Livelihood and SE
                  Foundation
                </li>
                <li>
                  <strong>Current Account no.:</strong> 50200029583556
                </li>
                <li>
                  <strong>Bank:</strong> HDFC Bank Ltd.
                </li>
                <li>
                  <strong>Branch:</strong> Adchini
                </li>
                <li>
                  <strong>RTGS/NEST IFSC:</strong> HDFC0004397
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ContributorsPage
