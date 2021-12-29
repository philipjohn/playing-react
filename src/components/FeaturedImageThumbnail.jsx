/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'

const FeaturedImageThumbnail = ({ id }) => {

	const [ image, setImage ] = useState({
		alt: 'Placeholder image',
		url: "http//placehold.it/150x150",
		width: 150,
		height: 150
	})

	useEffect(() => {
		// todo: put image into local storage to avoid unnecessary querying.
		apiFetch({ path: `http://lichfieldlive.test/wp-json/wp/v2/media/${ id }` })
			.then((resp) => {
				if (resp.media_details !== 'undefined') {
					setImage({
						alt: resp.alt_text,
						url: resp.media_details.sizes.thumbnail.source_url,
						width: resp.media_details.sizes.thumbnail.width,
						height: resp.media_details.sizes.thumbnail.height
					});
				}
			});
	}, [])

	return (
		<img
			src={ image.url }
			alt={ image.alt }
			width={ image.width }
			height={ image.height }
		/>
	)
}

FeaturedImageThumbnail.propTypes = {
	id: PropTypes.number.isRequired
}

export default FeaturedImageThumbnail