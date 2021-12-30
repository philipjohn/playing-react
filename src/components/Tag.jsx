import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ArticleList from './ArticleList'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'

const Tag = ({ id }) => {

	const [ tag, setTag ] = useState()

	useEffect(() => {
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/tags/${ id }`
		const storedTagKey = md5(apiUrl)
		const storedTag = JSON.parse(sessionStorage.getItem(storedTagKey))

		if (storedTag) {
			setTag(storedTag)
		} else {
			apiFetch({ url: apiUrl })
				.then((tag) => {
					setTag(tag);
					sessionStorage.setItem(storedTagKey, JSON.stringify(tag))
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{ tag &&
				<div className='screen-tag'>
					<h1 className='section-header'>{ tag.name }</h1>
					<ArticleList count={ 10 } tags={ [ id ] } />
				</div>
			}
		</>
	)
}

Tag.propTypes = {
	id: PropTypes.number.isRequired
}

export default Tag