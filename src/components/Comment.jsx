import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => (
	<div className="comment">
		<div className="comment-meta">
			<span className="author">{ comment.author_name }</span>
			<span className="date">{ comment.date }</span>
		</div>
		<div
			className="comment-text"
			dangerouslySetInnerHTML={ { __html: comment.content.rendered } }
		></div>
	</div>
)

Comment.propTypes = {
	comment: PropTypes.object.isRequired
}

export default Comment