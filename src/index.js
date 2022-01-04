import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Article from './components/Article'
import Author from './components/Author'
import Category from './components/Category'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search'
import Tag from './components/Tag'
import './index.css'

const App = () => {

	return (
		<>
			<Router>
				<Header />

				<Routes>
					<Route index path='/' element={ <Home /> }></Route>
					<Route path='/article/:id' element={ <Article /> }></Route>
					<Route path='/category/:id' element={ <Category /> }></Route>
					<Route path='/tag/:id' element={ <Tag /> }></Route>
					<Route path='/author/:id' element={ <Author /> }></Route>
					<Route path='/search/:searchTerm' element={ <Search /> }></Route>
					<Route path='*' element={
						<>
							<h1>Page not found!</h1>
							<p>Please go back and try something else.</p>
						</>
					} />
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