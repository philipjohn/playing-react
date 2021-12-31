import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import md5 from 'js-md5'
import { AppContext } from './Context'

const Byline = ({ id }) => {
	const [ author, setAuthor ] = useState({})
	const { goNavigate } = useContext(AppContext)

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/users/${ id }`
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

	const handleClick = (e) => {
		e.preventDefault()
		goNavigate('author', parseInt(e.target.attributes[ 'data-id' ].value))
	}

	return (
		<span className='byline'>
			by&nbsp;
			<a href={ author.link } data-id={ author.id } onClick={ handleClick }>
				{ author.name }
			</a>
		</span>
	)

}

Byline.propTypes = {
	id: PropTypes.number.isRequired
}

export default Byline