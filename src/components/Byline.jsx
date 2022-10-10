import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import md5 from 'js-md5'
import { Link } from 'react-router-dom'

const Byline = ({ id }) => {
	const [ author, setAuthor ] = useState({})

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.local/wp-json/wp/v2/users/${ id }`
		const storedAuthorKey = md5(apiUrl)
		const storedAuthor = JSON.parse(sessionStorage.getItem(storedAuthorKey))

		if (storedAuthor) {
			setAuthor(storedAuthor)
		} else {
			apiFetch({ url: apiUrl })
				.then((author) => {
					setAuthor(author);
					sessionStorage.setItem(storedAuthorKey, JSON.stringify(author))
				});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const toLink = `/author/${ id }`

	return (
		<span className='byline'>
			by&nbsp;
			<Link to={ toLink } >
				{ author.name }
			</Link>
		</span>
	)

}

Byline.propTypes = {
	id: PropTypes.number.isRequired
}

export default Byline