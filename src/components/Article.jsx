/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import he from 'he'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import FeaturedImage from './FeaturedImage'
import LoadingSpinner from './LoadingSpinner'
import CategoryLink from './CategoryLink'
import Byline from './Byline'
import TagsList from './TagsList'
import md5 from 'js-md5'
import ArticleList from './ArticleList'
import Comments from './Comments'
TimeAgo.addDefaultLocale(en)

const Article = ({ id }) => {
	const [ loading, setLoading ] = useState(true)
	const [ article, setArticle ] = useState()

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/posts/${ id }`
		const storedArticleKey = md5(apiUrl)
		const storedArticle = JSON.parse(sessionStorage.getItem(storedArticleKey))

		if (storedArticle) {
			setArticle(storedArticle)
			setLoading(false)
		} else {
			apiFetch({ url: apiUrl })
				.then((data) => {
					sessionStorage.setItem(storedArticleKey, JSON.stringify(data))
					setArticle(data)
					setLoading(false)
				})
		}
	}, [])

	const formatDate = (dateString) => {
		const timeAgo = new TimeAgo('en-GB')
		return timeAgo.format(new Date(dateString))
	}

	return (
		<>
			{ loading && <LoadingSpinner /> }
			{ (!loading && article) &&
				<div className='post'>
					<div className="entry-header">

						<CategoryLink id={ parseInt(article._yoast_wpseo_primary_category) } />

						<h1 className='entry-title'>{ he.decode(article.title.rendered) }</h1>

						<div className='article-meta'>
							<Byline id={ article.author } />
							<span
								className='published'
								title={ new Date(article.date) }
							>
								{ formatDate(article.date) }
							</span>
						</div>
					</div>

					<FeaturedImage
						innerWidth={ window.innerWidth }
						id={ article.featured_media }
					/>

					<div
						className='article-content'
						// Print the content, removing any embedded images.
						dangerouslySetInnerHTML={ { __html: article.content.rendered.replace(/<img[^>]*>/g, "") } }
					/>

					<TagsList ids={ article.tags } />
				</div>
			}
			<div className='post latest-articles'>
				<h1 className='section-header'>Latest Articles</h1>
				<ArticleList count={ 5 } />
			</div>

			{ article && <Comments postId={ article.id } /> }
		</>
	)
}

Article.propTypes = {
	id: PropTypes.number.isRequired
}

export default Article