import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppStore = ({ children }) => {

	const [ screen, setScreen ] = useState('home')
	const [ article, setArticle ] = useState()
	const [ category, setCategory ] = useState()
	const [ tag, setTag ] = useState()

	const goHome = () => {
		setArticle(false)
		setScreen('home')
	}

	const goArticle = (id) => {
		setArticle(id)
		setScreen('article')
	}

	const goCategory = (id) => {
		setCategory(id)
		setScreen('category')
	}

	const goTag = (id) => {
		setTag(id)
		setScreen('tag')
	}

	return (
		<AppContext.Provider value={ {
			screen: screen,
			goHome: goHome,
			article: article,
			goArticle: goArticle,
			category: category,
			goCategory: goCategory,
			tag: tag,
			goTag: goTag
		} }>
			{ children }
		</AppContext.Provider>
	)

}

export default AppStore