import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ page, nextLink, prevLink }) => (
	<div className="pagination">
		{ page > 1 && (
			<>
				<Link
					to={ prevLink }
					className='previous'
				>
					Previous
				</Link>
				<span className='page'>Page { page }</span>
			</>
		) }
		<Link
			to={ nextLink }
			className='next'
		>
			Next
		</Link>
	</div>
)

export default Pagination