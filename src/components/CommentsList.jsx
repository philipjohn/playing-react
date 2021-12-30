import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

const CommentsList = ({ comments }) => (
	<div id="comments">
		<h2 className="section-header">Comments</h2>
		{ comments.map(comment => <Comment comment={ comment } />) }
	</div>
)

CommentsList.propTypes = {
	comments: PropTypes.array.isRequired
}

export default CommentsList