import React, { useState, useEffect } from "react"
import { SEO } from "../components/elements"
import { Footer, Header } from "../components/sections"

import "../styles/common.scss"
import "../styles/page.scss"

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    fetch(
      `https://open-data.karuna2020.org/volunteers.json?v=${new Date().getTime()}`
    )
      .then(response => response.json())
      .then(items => setVolunteers(items))
      .catch(() => {})
  }, [])

  return (
    <>
      <SEO title="Volunteers" />
      <Header />
      <main className="container page">
        <section className="kit">
          <h1>Volunteers</h1>
          <div>
            <ul>
              {volunteers.map((i, x) => (
                <li key={i.sNo + x}>
                  <span>{i.name}</span>
                  <span>{i.areaOfWorkAllocated}</span>
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
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfWD4rqTpPpJupj97Cko9yMODzXgQttc7BhDQ8LotT_JvVe3w/viewform?vc=0&c=0&w=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become a volunteer &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default VolunteersPage
