import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import FeaturedImageThumbnail from './FeaturedImageThumbnail'
import { AppContext } from './Context'
import he from 'he'

const ArticleSummary = ({ article }) => {

	const { goNavigate } = useContext(AppContext)

	const handleClick = (e) => {
		e.preventDefault()
		goNavigate('article', parseInt(e.target.attributes[ "data-id" ].value))
	}

	return (
		<div className='post'>
			<FeaturedImageThumbnail id={ article.featured_media } />
			<h2 className='headline'>
				<a href={ article.link } onClick={ handleClick } data-id={ article.id }>
					{ he.decode(article.title.rendered) }
				</a>
			</h2>
		</div>
	)
}

ArticleSummary.propTypes = {
	article: PropTypes.object.isRequired
}

export default ArticleSummary