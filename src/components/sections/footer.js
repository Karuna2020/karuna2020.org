import PropTypes from "prop-types"
import React from "react"

const Footer = () => (
  <footer>
    <div className="container">
      <p>© {new Date().getFullYear()} Karuna 2020</p>
      <nav>
        <a href="/">Home</a>
        <a href="https://open-data.karuna2020.org">API</a>
        <a href="https://github.com/Karuna2020">GitHub</a>
      </nav>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: "",
}

export default Footer
