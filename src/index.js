import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Article from './components/Article'
import Author from './components/Author'
import Category from './components/Category'
import Header from './components/Header'
import Home from './components/Home'
import Tag from './components/Tag'
import './index.css'

const App = () => {

	return (
		<>
			<Router>
			<Header />

				<Routes>
					<Route index path='/' element={ <Home /> }></Route>
					<Route index path='/article/:id' element={ <Article /> }></Route>
					<Route index path='/category/:id' element={ <Category /> }></Route>
					<Route index path='/tag/:id' element={ <Tag /> }></Route>
					<Route index path='/author/:id' element={ <Author /> }></Route>
				</Routes>
			</Router>

			{/* todo: replace with footer component */ }
			<div id="footer">
				<p>Copyright &#169; Lichfield Community Media C.I.C., All rights reserved.</p>
				<p>"Lichfield Live" is a registered trademark of Lichfield Community Media C.I.C.</p>
			</div>
		</>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)