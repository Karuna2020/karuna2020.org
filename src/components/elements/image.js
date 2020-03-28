import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"

export const GatsbyImage = props => {
  const { src, alt, className } = props
  return <Img className={className} alt={alt} fluid={src} />
}

GatsbyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

const Image = props => {
  const { src, alt, className } = props
  return <img className={className} alt={alt} src={src} />
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

export default Image
