import React from 'react'
import PropTypes from 'prop-types'
import FeaturedImageThumbnail from './FeaturedImageThumbnail'
import he from 'he'
import { Link } from 'react-router-dom'

const ArticleSummary = ({ article }) => {

	const linkTo = `/article/${ article.id }`

	const title = article.title.rendered ?? article.title

	return (
		<div className='post'>
			{ article.featured_media && <FeaturedImageThumbnail id={ article.featured_media } /> }
			<h2 className='headline'>
				<Link to={ linkTo }>
					{ he.decode(title) }
				</Link>
			</h2>
		</div>
	)
}

ArticleSummary.propTypes = {
	article: PropTypes.object.isRequired
}

export default ArticleSummary