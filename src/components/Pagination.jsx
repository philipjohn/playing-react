import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Pagination = ({ page, nextLink, prevLink, handleNextClick }) => (
	<div className="pagination">
		{ page > 1 &&
			<>
				<Link
					to={ prevLink }
					className='previous'
				>
					Previous
				</Link>
				<span className='page'>Page { page }</span>
			</>
		}
		<Link
			to={ nextLink }
			className='next'
			onClick={ () => handleNextClick() }>Next</Link>
	</div>
)

Pagination.propTypes = {
	page: PropTypes.number,
	nextLink: PropTypes.string,
	prevLink: PropTypes.string
}

export default Pagination