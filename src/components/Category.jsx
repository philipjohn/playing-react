import React, { useEffect, useState } from 'react'
import ArticleList from './ArticleList'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import { useParams } from 'react-router-dom'
import Pagination from './Pagination'

const Category = () => {

	const { id, page = 1 } = useParams()

	const [ category, setCategory ] = useState()

	const prevPage = parseInt(page) - 1
	const nextPage = parseInt(page) + 1
	const navUrls = {
		previous: page > 1 ? `/category/${ id }/${ prevPage.toString() }` : undefined,
		next: `/category/${ id }/${ nextPage.toString() }`
	}

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/categories/${ id }`
		const storedCatKey = md5(apiUrl)
		const storedCat = JSON.parse(sessionStorage.getItem(storedCatKey))

		if (storedCat) {
			setCategory(storedCat)
		} else {
			apiFetch({ url: apiUrl })
				.then((cat) => {
					setCategory(cat);
					sessionStorage.setItem(storedCatKey, JSON.stringify(cat))
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{ category &&
				<div className='screen-category'>
					<h1 className='section-header'>{ category.name }</h1>
					<ArticleList
						count={ 10 }
						page={ parseInt(page) }
						type='category'
						ids={ [ id ] }
					/>
					<Pagination
						page={ page }
						prevLink={ navUrls.previous }
						nextLink={ navUrls.next }
					/>
				</div>
			}
		</>
	)
}

export default Category