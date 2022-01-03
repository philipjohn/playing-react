import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<div id='header'>
			<NavLink
				to='/'
				className='logo-link'
			>
				<img
					src='LichfieldLiveLogo_White.webp'
					alt='Lichfield Live logo'
					title='Go to home'
					width={ 140 }
					className='logo'
				/>
			</NavLink>
		</div>
	)
}

export default Header