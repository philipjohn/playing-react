import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppStore = ({ children }) => {

	const [ screen, setScreen ] = useState('home')
	const [ article, setArticle ] = useState()
	const [ category, setCategory ] = useState()
	const [ tag, setTag ] = useState()
	const [ author, setAuthor ] = useState()

	const goNavigate = (screen, id) => {
		switch (screen) {
			case "article":
				console.log('switching article')
				setScreen('article')
				setArticle(id)
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				break;
			case "category":
				setScreen('category')
				setCategory(id)
				break;
			case "tag":
				setScreen('tag')
				setTag(id)
				break;
			case "author":
				setScreen('author')
				setAuthor(id)
				break;
			default:
				setScreen('home')
				setArticle(false)
				setCategory(false)
				setTag(false)
				setAuthor(false)
		}
	}

	return (
		<AppContext.Provider value={ {
			goNavigate: goNavigate,
			screen: screen,
			article: article,
			category: category,
			tag: tag,
			author: author
		} }>
			{ children }
		</AppContext.Provider>
	)

}

export default AppStore