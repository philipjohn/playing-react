/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom'
TimeAgo.addDefaultLocale(en)

const Article = () => {
	const { id } = useParams()

	const [ loading, setLoading ] = useState(true)
	const [ article, setArticle ] = useState()

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.local/wp-json/wp/v2/posts/${ id }`
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
	}, [ id ])

	const formatDate = (dateString) => {
		const timeAgo = new TimeAgo('en-GB')
		return timeAgo.format(new Date(dateString))
	}

	const formatContent = (content) => {
		content = content.replace(/<img[^>]*>/g, "")
		content = content.replace(/<figure[^>]*>[^>]*<\/figure>/g, "")
		content = content.replace(/<figcaption[^>]*>[^>]*<\/figcaption>/g, "")
		return content
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
						dangerouslySetInnerHTML={ { __html: formatContent(article.content.rendered) } }
					/>

					<TagsList ids={ article.tags } />
				</div>
			}

			{ article && <Comments postId={ article.id } /> }

			<div className='post latest-articles'>
				<h1 className='section-header'>Latest Articles</h1>
				<ArticleList count={ 5 } />
			</div>

		</>
	)
}

export default Article