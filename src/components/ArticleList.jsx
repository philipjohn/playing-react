/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '@wordpress/api-fetch'
import ArticleSummary from './ArticleSummary'

const ArticleList = ({ count, tags, categories }) => {
	const [ posts, setPosts ] = useState([])

	const apiUrl = new URL(`http://lichfieldlive.test/wp-json/wp/v2/posts`)
	apiUrl.searchParams.append('per_page', count)
	if (tags) {
		apiUrl.searchParams.append("tags", tags.join(','));
	}
	if (categories) {
		apiUrl.searchParams.append("categories", categories.join(','));
	}

	useEffect(() => {
		console.log(apiUrl)
		apiFetch({ path: apiUrl.href })
			.then((posts) => {
				setPosts(posts);
			});
	}, [])

	return (
		<ul>
			{ posts.map((post) => {
				return (
					<li key={ post.id }>
						<ArticleSummary article={ post } />
					</li>
				)
			}) }
		</ul>
	)
}

ArticleList.defaultProps = {
	count: 10
}

ArticleList.propTypes = {
	count: PropTypes.number,
	tags: PropTypes.array,
	categories: PropTypes.array
}

export default ArticleList