import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import { useParams } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import ArticleSummary from './ArticleSummary'

const Search = () => {

	const { searchTerm } = useParams()

	const [ search, setSearch ] = useState()
	const [ loading, setLoading ] = useState(true)

	useEffect(() => {
		const apiUrl = new URL('http://lichfieldlive.test/wp-json/wp/v2/search/')
		apiUrl.searchParams.append('search', searchTerm)
		apiUrl.searchParams.append('type', 'post')
		apiUrl.searchParams.append('subtype', 'post')
		console.log(apiUrl.href)
		const storedSearchKey = md5(apiUrl.href)
		const storedSearch = JSON.parse(sessionStorage.getItem(storedSearchKey))

		if (storedSearch) {
			setSearch(storedSearch)
			setLoading(false)
		} else {
			apiFetch({ url: apiUrl.href })
				.then((res) => {
					setSearch(res);
					setLoading(false)
					sessionStorage.setItem(storedSearchKey, JSON.stringify(res))
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className='screen-search'>
				<h1 className='section-header'>Search results for "{ searchTerm }"</h1>
				{ loading && <LoadingSpinner /> }
				{ search && (
					<ul className='article-list'>
						{ search.map((article) => (
							<ArticleSummary article={ article } key={ article.id } />
						)) }
					</ul>
				) }
			</div>
		</>
	)
}

export default Search