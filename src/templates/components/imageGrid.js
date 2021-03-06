import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Request from 'superagent'
import PropTypes from 'prop-types'
import Main from '../main'
import ImageTile from './imageTile'
import SearchInput from './searchInput'
import Filter from './filter'
import {debounce} from 'throttle-debounce'

class ImageGrid extends Component {
  constructor (props) {
    super()
    this.updateSearch = this.updateSearch.bind(this)
    this.updateSort = this.updateSort.bind(this)
    this.handleResults = this.handleResults.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      'results': [],
      'searchTerm': 'Holiday Extras',
      'error': false,
      'page': 1,
      'sort': 'relevance'
    }
  }

  componentDidMount () {
    this.getData()
    window.addEventListener('scroll', debounce(100, this.handleScroll), { passive: true })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.page !== this.state.page) this.getData()
    if (prevState.sort !== this.state.sort) this.getData()
    if (prevState.searchTerm !== this.state.searchTerm) {
      window.updateSearchTerm = setTimeout(() => {
        this.getData()
      }, 300)
    }
  }
  // if loadingitem is within viewport update state for second page
  handleScroll (offset = 0) {
    const top = ReactDOM.findDOMNode(this.refs['loadingItem']).getBoundingClientRect().top
    if (top <= window.innerHeight) {
      const { page } = this.state
      this.setState({ page: page + 1 })
    }
  }

  getData () {
    const { flickrApiKey, flickrEndpoint } = this.props
    const { searchTerm, page, sort } = this.state
    Request.get(flickrEndpoint)
      .query({
        'api_key': flickrApiKey,
        'method': 'flickr.photos.search',
        'format': 'json',
        'nojsoncallback': true,
        'per_page': 20,
        'page': page,
        'extras': 'tags,description,machine_tags',
        'text': searchTerm,
        'sort': sort
      })
      .end(this.handleResults)
  }
  // concat results array
  handleResults (err, res) {
    if (err || !res.body || !res.body.photos || !res.body.photos.photo.length) return this.toggleError()
    const { results } = this.state
    this.setState({
      results: results.concat(res.body.photos.photo)
    })
  }
  // toggle error to keep tidy
  toggleError () {
    const { error } = this.state
    this.setState({
      error: !error
    })
  }
  // return images from imageTile if present, else return error
  getImages () {
    const { results, error, searchTerm, page } = this.state
    if (error && !searchTerm) return (<h2>Please insert a search term</h2>)
    if (error) return (<h2>Something went wrong, please try again...</h2>)
    if (!results || !results.length) return (<div ref={'loadingItem'}>{this.getLoadingItem()}</div>)
    return results.map((item) => {
      const { id, secret, title, farm, server } = item
      if (!id || !secret || !title || !farm || !server) return null
      const UniqueKey = item.id + Math.floor(Math.random() * Math.floor(999))
      return (
        <ImageTile callback={this.updateSearch} item={item} key={UniqueKey} />
      )
    })
  }
  // clear interval on key press to stop constant fetches
  clearTimer () {
    clearInterval(window.updateSearchTerm)
  }
  // callback to update search term
  updateSearch (e) {
    const { error } = this.state
    // reset if error is current
    if (error) this.toggleError()
    if (window.updateSearchTerm) this.clearTimer()
    const searchTerm = e.target.value || e.target.innerHTML.replace('#', '')
    // reset results and pages as we're fetching new set of pages and results
    this.setState({
      searchTerm,
      results: [],
      page: 1
    })
  }

  updateSort (e) {
    if (!e || !e.target || !e.target.value) return false
    // reset results as we're re-populating with newly sorted ones.
    this.setState({
      sort: e.target.value,
      results: []
    })
  }

  getLoadingItem () {
    const { loadingGif } = this.props
    return (
      <div className='loadingGif'>
        <div className='col-sm-3 tileContainer panel panel-default'>
          <div className='imageContainer'>
            <img src={loadingGif} alt={'loading'} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { searchTerm, error, page, results } = this.state
    const images = this.getImages()

    return (
      <div id='grid' className='col-xs-12'>
        <div className='filterBar row'>
          <SearchInput callback={this.updateSearch} searchTerm={searchTerm} />
          <Filter callback={this.updateSort} />
        </div>
        <div className='images'>
          {images}
        </div>
        { results.length >= 20 &&
          <div ref={'loadingItem'}>{this.getLoadingItem()}</div>
        }
      </div>
    )
  }
}

ImageGrid.propTypes = {
  flickrApiKey: PropTypes.string.isRequired,
  flickrEndpoint: PropTypes.string.isRequired,
  loadingGif: PropTypes.string.isRequired
}

export default ImageGrid
