/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import md5 from 'js-md5'

import apiFetch from '@wordpress/api-fetch'
import ArticleSummary from './ArticleSummary'
import LoadingSpinner from './LoadingSpinner'

const ArticleList = ({ count, tags, categories, authors, excludeTags }) => {
	const [ posts, setPosts ] = useState([])
	const [ loading, setLoading ] = useState(true)

	const apiUrl = new URL(`http://lichfieldlive.test/wp-json/wp/v2/posts`)
	apiUrl.searchParams.append('per_page', count)
	if (tags) {
		apiUrl.searchParams.append('tags', tags.join(','))
	}
	if (categories) {
		apiUrl.searchParams.append('categories', categories.join(','))
	}
	if (authors) {
		apiUrl.searchParams.append('author', authors.join(','))
	}
	if (excludeTags) {
		apiUrl.searchParams.append('tags_exclude', excludeTags.join(','))
	}

	useEffect(() => {

		// Store the data in local storage to reduce remote API calls.
		const stored_posts_key = md5(apiUrl.href)
		const stored_posts = JSON.parse(sessionStorage.getItem(stored_posts_key))
		if (stored_posts) {
			setPosts(stored_posts)
			setLoading(false)
		} else {
			apiFetch({ path: apiUrl.href })
				.then((posts) => {
					sessionStorage.setItem(stored_posts_key, JSON.stringify(posts))
					setPosts(posts)
					setLoading(false)
				});
		}
	}, [])

	return (
		<>
			{ loading && <LoadingSpinner /> }
			{ posts && (
				<ul className='article-list'>
					{ posts.map((post) => {
						return (
							<li key={ post.id }>
								<ArticleSummary article={ post } />
							</li>
						)
					}) }
				</ul>
			) }
		</>
	)
}

ArticleList.defaultProps = {
	count: 10
}

ArticleList.propTypes = {
	count: PropTypes.number,
	tags: PropTypes.array,
	categories: PropTypes.array,
	authors: PropTypes.array
}

export default ArticleList