import React from 'react'
import ArticleList from './ArticleList'

const Home = () => (
	<div className='screen-home'>
		<div className='featured-articles'>
			<h1>Featured Articles</h1>
			<ArticleList count={ 4 } tags={ [ 9074, 77 ] } />
		</div>
		<div className='featured-articles'>
			<h1>Latest Articles</h1>
			<ArticleList count={ 10 } />
		</div>
	</div>
)

export default Home