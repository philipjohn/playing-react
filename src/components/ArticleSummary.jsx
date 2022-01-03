import React from 'react'
import PropTypes from 'prop-types'
import FeaturedImageThumbnail from './FeaturedImageThumbnail'
import he from 'he'
import { Link } from 'react-router-dom'

const ArticleSummary = ({ article }) => {

	const linkTo = `/article/${ article.id }`

	return (
		<div className='post'>
			<FeaturedImageThumbnail id={ article.featured_media } />
			<h2 className='headline'>
				<Link to={ linkTo }>
					{ he.decode(article.title.rendered) }
				</Link>
			</h2>
		</div>
	)
}

ArticleSummary.propTypes = {
	article: PropTypes.object.isRequired
}

export default ArticleSummary