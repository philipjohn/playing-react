import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import md5 from 'js-md5'

const CategoryLink = ({ id }) => {

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
	}, [])

	return (
		<>
			{ category &&
				<div className='category'>
					<a href={ category.link }>
						{ category.name }
					</a>
				</div>
			}
		</>
	)
}

CategoryLink.propTypes = {
	id: PropTypes.number.isRequired
}

export default CategoryLink