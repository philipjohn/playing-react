import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '@wordpress/api-fetch'
import LoadingSpinner from './LoadingSpinner'

const FeaturedImage = ({ id, innerWidth }) => {

	const [ loading, setLoading ] = useState(true)
	const [ image, setImage ] = useState()
	const [ altText, setAltText ] = useState()

	useEffect(() => {
		apiFetch({ url: `http://lichfieldlive.test/wp-json/wp/v2/media/${ id }` })
			.then((data) => {

				setAltText(data.alt_text)

				// Put the sizes in an array.
				const sizes = []
				for (let key in data.media_details.sizes) {

					// Avoid weird sizes added by plugins/the theme.
					const desiredSizes = [
						'medium',
						'large',
						'thumbnail',
						'medium_large',
						'full'
					]
					if (desiredSizes.indexOf(key) !== -1) {
						sizes.push(data.media_details.sizes[ key ])
					}
				}

				// Order by width, ascending.
				sizes.sort((a, b) => parseFloat(a.width) - parseFloat(b.width))

				// Set the chosen image.
				let chosenImage = false
				for (let key in sizes) {
					if (sizes[ key ].width > innerWidth) {
						chosenImage = sizes[ key ]
						break
					}
				}

				return chosenImage
			})
			.then((image) => {
				setImage(image)
				setLoading(false)
			})
	}, [])

	return (
		<>
			{ loading && (
				<LoadingSpinner width={ innerWidth } height={ (innerWidth * 0.75) } />
			) }
			{ (!loading && image) && (
				<div className='featured-image'>
					{ image &&
						<img
							src={ image.source_url }
							width={ image.width }
							height={ image.height }
							alt={ altText }
						/>
					}
				</div>
			) }
		</>
	)
}

FeaturedImage.propTypes = {
	id: PropTypes.number.isRequired,
	innerWidth: PropTypes.number.isRequired
}

export default FeaturedImage