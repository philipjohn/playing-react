import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import md5 from 'js-md5'
import apiFetch from '@wordpress/api-fetch'
import LoadingSpinner from './LoadingSpinner'
import CommentsList from './CommentsList'

const Comments = ({ postId }) => {
	const [ comments, setComments ] = useState([])
	const [ loading, setLoading ] = useState(true)

	useEffect(() => {
		const apiUrl = new URL('http://lichfieldlive.test/wp-json/wp/v2/comments')
		apiUrl.searchParams.append('post', postId)
		apiUrl.searchParams.append('context', 'view')
		apiUrl.searchParams.append('per_page', '100')

		const storedCommentsKey = md5(apiUrl.href)
		const storedComments = false // JSON.parse(sessionStorage.getItem(storedCommentsKey))

		if (storedComments) {
			setComments(storedComments)
			setLoading(false)
		} else {
			apiFetch({ url: apiUrl.href })
				.then((data) => {
					sessionStorage.setItem(storedCommentsKey, JSON.stringify(data))
					setComments(data)
					setLoading(false)
				})
		}
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [])

	return (
		<>
			{ loading && <LoadingSpinner /> }
			{ (!loading && comments.length > 0) && <CommentsList comments={ comments } /> }
		</>
	)
}

Comments.propTypes = {
	postId: PropTypes.number.isRequired
}

export default Comments