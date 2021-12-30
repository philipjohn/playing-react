import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppStore = ({ children }) => {

	const [ screen, setScreen ] = useState('home')
	const [ article, setArticle ] = useState()

	const showArticle = (id) => {
		setArticle(id)
		setScreen('article')
	}

	return (
		<AppContext.Provider value={ {
			screen: screen,
			setScreen: setScreen,
			article: article,
			showArticle: showArticle
		} }>
			{ children }
		</AppContext.Provider>
	)

}

export default AppStore