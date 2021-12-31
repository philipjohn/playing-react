import React from 'react'

import '../spinner.css'

const LoadingSpinner = ({ width, height }) => {
	const style = {
		"minWidth": width ?? "100%",
		"maxWidth": width ?? "100%",
		"minHeight": height ?? "250",
		"maxHeight": height ?? "250"
	}
	return (
		<div style={ style } className='loading-spinner'>
			<div className='spinner'></div>
		</div >
	)
}

export default LoadingSpinner