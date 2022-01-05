import React from 'react'
import { useParams } from 'react-router-dom'
import Pagination from './Pagination'
import ArticleList from './ArticleList'

const Search = () => {

	const { searchTerm, page = 1 } = useParams()

	const prevPage = parseInt(page) - 1
	const nextPage = parseInt(page) + 1
	const navUrls = {
		previous: page > 1 ? `/search/${ searchTerm }/${ prevPage.toString() }` : undefined,
		next: `/search/${ searchTerm }/${ nextPage.toString() }`
	}

	return (
		<>
			<div className='screen-search'>
				<h1 className='section-header'>
					Search results for "{ searchTerm }"
				</h1>
				<ArticleList
					type='search'
					searchTerm={ searchTerm }
					page={ page }
				/>

				<Pagination
					page={ page }
					prevLink={ navUrls.previous }
					nextLink={ navUrls.next }
				/>
			</div>
		</>
	)
}

export default Search