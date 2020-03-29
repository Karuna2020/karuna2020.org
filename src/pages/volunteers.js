import React, { useState, useEffect } from "react"
import { SEO } from "../components/elements"
import { Footer } from "../components/sections"

import "../styles/common.scss"
import "../styles/page.scss"

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    fetch("https://open-data.karuna2020.org/volunteers.json")
      .then(response => response.json())
      .then(items => setVolunteers(items))
      .catch(() => {})
  }, [])

  return (
    <>
      <SEO title="Volunteers" />
      <main className="container page">
        <section className="kit">
          <h1>Volunteers</h1>
          <div>
            <ul>
              {volunteers.map((i, x) => (
                <li key={i["S. No."] + x}>
                  <span>{i.Name}</span>
                  <span>{i["Area of Work Allocated "]}</span>
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

export default VolunteersPage
