import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import md5 from 'js-md5'
import { Link } from 'react-router-dom'

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ id ])

	const toLink = `/category/${ id }`

	return (
		<>
			{ category &&
				<div className='category'>
					<Link to={ toLink }>
						{ category.name }
					</Link>
				</div>
			}
		</>
	)
}

CategoryLink.propTypes = {
	id: PropTypes.number.isRequired
}

export default CategoryLink