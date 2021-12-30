/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import LoadingSpinner from './LoadingSpinner'

const FeaturedImageThumbnail = ({ id }) => {

	const [ placeholder, setPlaceholder ] = useState(true)
	const [ image, setImage ] = useState()

	useEffect(() => {
		// Store the data in local storage to reduce remote API calls.
		const apiUrl = `http://lichfieldlive.test/wp-json/wp/v2/media/${ id }`
		const storedImageKey = md5(apiUrl)
		const storedImage = JSON.parse(sessionStorage.getItem(storedImageKey))
		if (storedImage) {
			setImage(storedImage)
			setPlaceholder(false)
		} else {
			apiFetch({ path: apiUrl })
				.then((resp) => {
					if (resp.media_details !== 'undefined') {
						const imgObj = {
							alt: resp.alt_text,
							url: resp.media_details.sizes.thumbnail.source_url,
							width: 100,
							height: 100
						}
						setImage(imgObj);
						sessionStorage.setItem(storedImageKey, JSON.stringify(imgObj))
						setPlaceholder(false)
					}
				});
		}

	}, [])

	return (
		<>
			{ placeholder && (
				<LoadingSpinner width={ 100 } height={ 100 } />
			) }
			{ image && (
				<img
					src={ image.url }
					alt={ image.alt }
					width={ image.width }
					height={ image.height }
				/>
			) }
		</>
	)
}

FeaturedImageThumbnail.propTypes = {
	id: PropTypes.number.isRequired
}

export default FeaturedImageThumbnail