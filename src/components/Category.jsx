import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ArticleList from './ArticleList'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import { useParams } from 'react-router-dom'

const Category = () => {

	const { id } = useParams()

	const [ category, setCategory ] = useState()

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
					<ArticleList count={ 10 } categories={ [ id ] } />
				</div>
			}
		</>
	)
}

Category.propTypes = {
	id: PropTypes.number.isRequired
}

export default Category