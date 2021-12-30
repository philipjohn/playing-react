import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import Article from './components/Article'
import Category from './components/Category'
import AppStore, { AppContext } from './components/Context'
import Header from './components/Header'
import Home from './components/Home'
import Tag from './components/Tag'
import './index.css'

const App = () => {

	// eslint-disable-next-line no-unused-vars
	const { screen, article, category, tag } = useContext(AppContext)

	return (
		<>
			<Header />

			{ screen === 'home' && <Home /> }
			{ screen === 'article' && <Article id={ article } /> }
			{ screen === 'category' && <Category id={ category } /> }
			{ screen === 'tag' && <Tag id={ tag } /> }

			{/* todo: replace with footer component */ }
			<div id="footer">
				<p>Copyright &#169; Lichfield Community Media C.I.C., All rights reserved.</p>
				<p>"Lichfield Live" is a registered trademark of Lichfield Community Media C.I.C.</p>
			</div>
		</>
	)
}

ReactDOM.render(
	<AppStore>
		<App />
	</AppStore>,
	document.getElementById('root')
)