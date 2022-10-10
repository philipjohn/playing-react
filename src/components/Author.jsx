import React, { useEffect, useState } from 'react'
import ArticleList from './ArticleList'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import { useParams } from 'react-router-dom'

const Author = () => {

	const { id } = useParams()

	const [ author, setAuthor ] = useState()

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

	return (
		<>
			{ author &&
				<div className='screen-author'>
					<h1 className='section-header'>{ author.name }</h1>
					<ArticleList count={ 10 } type='author' ids={ [ id ] } />
				</div>
			}
		</>
	)
}

export default Author