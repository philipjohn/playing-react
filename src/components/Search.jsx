import React, { useEffect, useState } from 'react'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import { useParams, Link } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import ArticleSummary from './ArticleSummary'

const Search = () => {

	const { searchTerm, page = 1 } = useParams()

	const [ search, setSearch ] = useState()
	const [ loading, setLoading ] = useState(true)

	const prevPage = parseInt(page) - 1
	const nextPage = parseInt(page) + 1
	const navUrls = {
		previous: page > 1 ? `/search/${ searchTerm }/${ prevPage.toString() }` : undefined,
		next: `/search/${ searchTerm }/${ nextPage.toString() }`
	}

	useEffect(() => {
		const apiUrl = new URL('http://lichfieldlive.test/wp-json/wp/v2/search/')
		// TODO: Sanitise this search term.
		apiUrl.searchParams.append('search', searchTerm)
		apiUrl.searchParams.append('type', 'post')
		apiUrl.searchParams.append('subtype', 'post')
		if (page !== 1) {
			apiUrl.searchParams.append('page', parseInt(page))
		}

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
	}, [ page ])

	return (
		<>
			<div className='screen-search'>
				<h1 className='section-header'>Search results for "{ searchTerm }"</h1>
				{ loading && <LoadingSpinner /> }
				{ search && (
					<>
						<ul className='article-list'>
						{ search.map((article) => (
							<ArticleSummary article={ article } key={ article.id } />
						)) }
						</ul>

						<div className="pagination">
							{ page > 1 &&
								<Link
									to={ navUrls.previous }
									className='previous'
								>
									Previous
								</Link>
							}
							<Link
								to={ navUrls.next }
								className='next'
								onClick={ () => {
									setLoading(true)
									setSearch()
								} }>Next</Link>
						</div>
					</>
				) }
			</div>
		</>
	)
}

export default Search