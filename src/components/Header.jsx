import React, { useContext } from 'react'
import { AppContext } from './Context'

const Header = () => {
	const { goNavigate } = useContext(AppContext)
	return (
		<div id='header'>
			<a
				href="/"
				className='logo-link'
				onClick={ () => { goNavigate('home') } }
			>
				<img
					src='LichfieldLiveLogo_White.webp'
					alt='Lichfield Live logo'
					title='Go to home'
					width={ 140 }
					className='logo'
				/>
			</a>
		</div>
	)
}

export default Header