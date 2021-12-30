/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import LoadingSpinner from './LoadingSpinner'

const FeaturedImageThumbnail = ({ id }) => {

	const [ placeholder, setPlaceholder ] = useState(true)
	const [ image, setImage ] = useState()

	useEffect(() => {
		// todo: put image into local storage to avoid unnecessary querying.
		apiFetch({ path: `http://lichfieldlive.test/wp-json/wp/v2/media/${ id }` })
			.then((resp) => {
				if (resp.media_details !== 'undefined') {
					setImage({
						alt: resp.alt_text,
						url: resp.media_details.sizes.thumbnail.source_url,
						width: 100,
						height: 100
					});
					setPlaceholder(false)
				}
			});
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