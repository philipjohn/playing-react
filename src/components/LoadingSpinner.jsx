import React from 'react'

import '../spinner.css'

const LoadingSpinner = ({ width, height }) => {
	const style = {
		"min-width": width ?? "100%",
		"max-width": width ?? "100%",
		"min-height": height ?? "250",
		"max-height": height ?? "250"
	}
	return (
		<div style={ style } className='loading-spinner'>
			<div className='spinner'></div>
		</div >
	)
}

export default LoadingSpinner