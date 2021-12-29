/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import he from 'he'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

const Article = ({ id }) => {
	const [ article, setArticle ] = useState()
	const [ category, setCategory ] = useState()
	const [ tags, setTags ] = useState([])
	const [ author, setAuthor ] = useState([])

	useEffect(() => {
		apiFetch({ url: `http://lichfieldlive.test/wp-json/wp/v2/posts/${ id }` })
			.then((data) => {
				setArticle(data)
				apiFetch({ url: `http://lichfieldlive.test/wp-json/wp/v2/categories/${ data._yoast_wpseo_primary_category }` })
					.then((cat) => {
						setCategory(cat);
					});
				apiFetch({ url: `http://lichfieldlive.test/wp-json/wp/v2/users/${ data.author }` })
					.then((author) => {
						setAuthor(author);
					});
				return data.tags
			})
			.then((data) => {
				return fetchTags(data).then(res => {
					setTags(res)
				})
			});
	}, [])

	const fetchTags = (tags) => {
		const promises = tags.map(e =>
			apiFetch({ url: `http://lichfieldlive.test/wp-json/wp/v2/tags/${ e }` })
				.then(res => res)
		)

		return Promise.all(promises)
	}

	const formatDate = (dateString) => {
		TimeAgo.addDefaultLocale(en)
		const timeAgo = new TimeAgo('en-GB')
		return timeAgo.format(new Date(dateString))
	}

	return (
		<>
			{ article &&
				<div className='post'>
					<div className="entry-header">
						{ category &&
							<div className='category'>
								<a href={ category.link }>
									{ category.name }
								</a>
							</div>
						}
						<h1 className='entry-title'>{ he.decode(article.title.rendered) }</h1>
						{/*
							todo: insert featured image using new <FeaturedImage/> component
							and prop passing window.innerWidth to choose a good image
							size to retrieve.
						*/}
						<div className='article-meta'>
							<span className='byline'>by { author.name }</span>
							<span
								className='published'
								title={ new Date(article.date) }
							>
								{ formatDate(article.date) }
							</span>
						</div>
					</div>
					<div
						className='article-content'
						// Print the content, removing any embedded images.
						dangerouslySetInnerHTML={ { __html: article.content.rendered.replace(/<img[^>]*>/g, "") } }
					/>
					{ tags &&
						<div className='tags'>
							<span>Tagged: </span>
							<ul>
								{ tags.map((tag) => (
									<li key={ tag.id }>
										<a href={ tag.id }>
											{ tag.name }
										</a>
									</li>
								)) }
							</ul>
						</div>
					}
				</div>
			}
		</>
	)
}

Article.propTypes = {
	id: PropTypes.number.isRequired
}

export default Article