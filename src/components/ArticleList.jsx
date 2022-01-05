/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ArticleSummary from './ArticleSummary'
import LoadingSpinner from './LoadingSpinner'
import { WP_API } from '../data'

const ArticleList = ({ count, page, type, ids, exclude }) => {
	const [ posts, setPosts ] = useState([])
	const [ loading, setLoading ] = useState(true)

	useEffect(() => {

		let api = new WP_API()
		if (count) { api.setCount(count) }
		if (page) { api.setPage(page) }
		if (exclude) { api.excludePosts(exclude) }

		switch (type) {
			case 'tag':
				api.setTags(ids)
				break
			case 'category':
				api.setCategories(ids)
				break
			case 'author':
				api.setAuthors(ids)
				break
			default:
			// latest, do nothing
		}

		api.getPosts().then((res) => {
			setPosts(res)
			setLoading(false)
		})


	}, [])

	return (
		<>
			{ loading && <LoadingSpinner /> }
			{ (posts && !loading) && (
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
	page: PropTypes.number,
	tags: PropTypes.array,
	categories: PropTypes.array,
	authors: PropTypes.array
}

export default ArticleList