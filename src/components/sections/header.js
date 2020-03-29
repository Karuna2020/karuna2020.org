import PropTypes from "prop-types"
import React from "react"
import { Image } from "../../components/elements"
import { Link } from "gatsby"

const Header = () => (
  <header className="masthead">
    <Link to="/">
      <Image
        className="logo"
        alt="Karuna 2020"
        src="https://cdn.karuna2020.org/logo-vertical.svg"
      />
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
