import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer>
    <div className="container">
      <p>© {new Date().getFullYear()} Karuna 2020</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/volunteers">Volunteers</Link>
        <Link to="/contributors">Contributors</Link>
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
