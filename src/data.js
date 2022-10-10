import apiFetch from "@wordpress/api-fetch"
import md5 from "js-md5"

const apiRoot = 'http://lichfieldlive.local/wp-json/wp/v2'

export class WP_API {
	constructor() {
		this.per_page = 10
		this.page = 1
		this.context = 'view'
		this.status = 'publish'
	}

	setCount(count) {
		this.per_page = Math.min(count, 100)
	}

	setPage(page) {
		this.page = Math.min(page, 100)
	}

	setCategories(categories) {
		this.categories = categories.join(',')
	}

	excludeCategories(categories) {
		this.categories_exclude = categories.join(',')
	}

	setTags(tags) {
		this.tags = tags.join(',')
	}

	excludeTags(tags) {
		this.tags_exclude = tags.join(',')
	}

	setAuthors(authors) {
		this.author = authors.join('')
	}

	setSearchTerm(searchTerm) {
		this.search = searchTerm
	}

	excludePosts(posts) {
		this.exclude = posts.join(',')
	}

	includePosts(posts) {
		this.include = posts.join(',')
	}

	setOrder(order, by = 'date') {
		this.order = order
		this.orderby = by
	}

	getPosts() {
		this.endpoint = 'posts'
		this._constructApiUrl()
		return this._getData()
	}

	_constructApiUrl() {
		const apiUrl = new URL(apiRoot + '/' + this.endpoint)

		apiUrl.searchParams.append('per_page', this.per_page)
		apiUrl.searchParams.append('page', this.page)
		apiUrl.searchParams.append('context', this.context)
		apiUrl.searchParams.append('status', this.status)

		if (this.categories) {
			apiUrl.searchParams.append('categories', this.categories)
		}

		if (this.categories_exclude) {
			apiUrl.searchParams.append('categories_exclude', this.categories_exclude)
		}

		if (this.tags) {
			apiUrl.searchParams.append('tags', this.tags)
		}

		if (this.tags_exclude) {
			apiUrl.searchParams.append('tags_exclude', this.tags_exclude)
		}

		if (this.author) {
			apiUrl.searchParams.append('author', this.author)
		}

		if (this.search) {
			apiUrl.searchParams.append('search', this.search)
		}

		if (this.exclude) {
			apiUrl.searchParams.append('exclude', this.exclude)
		}

		if (this.include) {
			apiUrl.searchParams.append('include', this.include)
		}

		if (this.order) {
			apiUrl.searchParams.append('order', this.order)
			apiUrl.searchParams.append('orderby', this.orderby)
		}

		this.apiUrl = apiUrl
	}

	_getData = async () => {
		let data = this._getCachedResponse(this._getCacheKey(this.apiUrl))
		if (!data) {
			await this._getLiveResponse(this.apiUrl).then((res) => { data = res })
		}
		return data

	}

	_getCacheKey = (apiUrl) => {
		return md5(apiUrl.href)
	}

	_getCachedResponse = (cache_key) => {
		return JSON.parse(sessionStorage.getItem(cache_key))
	}

	_setCachedResponse = (cache_key, data) => {
		sessionStorage.setItem(cache_key, JSON.stringify(data))
	}

	_getLiveResponse = async (apiUrl) => {
		let data
		await apiFetch({ url: apiUrl.href })
			.then((res) => {
				console.log('apiFetch.then')
				this._setCachedResponse(this._getCacheKey(apiUrl), res)
				data = res
			})
		return data
	}
}