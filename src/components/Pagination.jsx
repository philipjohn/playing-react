import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ page, nextLink, prevLink, handleClick }) => (
	<div className="pagination">
		{ page > 1 &&
			<>
				<Link
					to={ prevLink }
					className='previous'
				onClick={ () => handleClick() }
				>
					Previous
				</Link>
				<span className='page'>Page { page }</span>
			</>
		}
		<Link
			to={ nextLink }
			className='next'
			onClick={ () => handleClick() }>Next</Link>
	</div>
)

export default Pagination