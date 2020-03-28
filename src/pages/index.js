import React from "react"
import { SEO, Image } from "../components/elements"

import "../styles/common.scss"
import "../styles/index.scss"

const IndexPage = () => (
  <>
    <SEO title="Karuna 2020" />
    <main className="home-main">
      <Image
        className="logo"
        alt="Karuna 2020"
        src="https://cdn.karuna2020.org/logo-vertical.svg"
      />
      <p>
        While many of us will be able to comfortably sustain for months at home,
        there will be millions of people—especially those with limited financial
        means, senior citizens, the differently abled, etc.—who may find it very
        difficult to pull through even for a few days without the basic three
        meals or essential medicines.
      </p>
      <p>
        While the Government is putting significant effort in making lives of
        its citizens comfortable, what can we do to help?{" "}
        <strong>Karuna 2020</strong> is a small effort to try to bring together
        people and do our part in helping feed those most affected during the
        coronavirus pandemic.
      </p>
      <div className="buttons">
        <a
          href="https://www.facebook.com/Karuna2020.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow our progress on Facebook &rarr;
        </a>
        <a
          href="https://github.com/Karuna2020"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </a>
      </div>
    </main>
  </>
)

export default IndexPage
