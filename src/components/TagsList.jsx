import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import md5 from 'js-md5'

const TagsList = ({ ids }) => {
	const [ tags, setTags ] = useState([])

	useEffect(() => {
		fetchTags(ids).then(res => {
			setTags(res)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchTags = (tags) => {
		const promises = tags.map(fetchTag)
		return Promise.all(promises)
	}

	const fetchTag = (tag) => {
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/tags/${ tag }`
		const storedTagKey = md5(apiUrl)
		const storedTag = JSON.parse(sessionStorage.getItem(storedTagKey))

		return storedTag ?? apiFetch({ url: apiUrl })
			.then(res => {
				sessionStorage.setItem(storedTagKey, JSON.stringify(res))
				return res
			})
	}

	return (
		<>
			{ tags &&
				<div className='tags'>
					<span>Tagged: </span>
					<ul>
						{ tags.map((tag) => (
							<li key={ tag.id }>
								<a href={ tag.id }>
									{ tag.name }
								</a>
							</li>
						)) }
					</ul>
				</div>
			}
		</>
	)
}

TagsList.propTypes = {
	ids: PropTypes.array.isRequired
}

export default TagsList