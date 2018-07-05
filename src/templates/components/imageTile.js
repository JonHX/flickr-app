import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from '../main'
import PropTypes from 'prop-types'

class ImageTile extends Component {
  constructor (props) {
    super()
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleDescription = this.toggleDescription.bind(this)
    this.state = {
      'showModal': false,
      'showDescription': false
    }
  }

  createImageUrl (size) {
    const { item: { farm, server, id, secret } } = this.props
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}${size}.jpg`
  }

  createImageLink () {
    const { item: { owner, id } } = this.props
    return `https://www.flickr.com/photos/${owner}/${id}`
  }

  getFormattedTags () {
    const { item: { tags = false }, callback } = this.props
    if (!tags) return (<small>No Tags found</small>)
    const tagArray = tags.split(' ')
    return tagArray.map((tag, index) => {
      const UniqueKey = tag + Math.floor(Math.random() * Math.floor(999))
      return (
        <small key={UniqueKey} onClick={callback} className='tag'>#{tag}</small>
      )
    })
  }

  toggleModal (e) {
    const { showModal } = this.state
    if (e.target.classList.contains('descriptionToggle')) return false
    this.setState({
      showModal: !showModal
    })
  }

  getDescription () {
    const { item: { description } } = this.props
    return description && description._content ? description._content : 'No Description'
  }

  toggleDescription () {
    const { showDescription } = this.state
    this.setState({
      showDescription: !showDescription
    })
  }

  render () {
    const { item: { title } } = this.props
    const { showModal, showDescription } = this.state
    const url = this.createImageUrl('_n')
    const imageLink = this.createImageLink()
    const modalImageUrl = this.createImageUrl('_c')
    const createImageLink = this.createImageLink()
    const imageTags = this.getFormattedTags()
    const description = this.getDescription()

    return (
      <div>
        <div onClick={this.toggleModal} className='col-sm-4 col-md-3 tileContainer panel panel-default'>
          <div className='imageContainer'>
            <img src={url} alt={title} />
          </div>
        </div>
        { showModal &&
          <div className='modal fade in' onClick={this.toggleModal}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button onClick={this.toggleModal} type='button' className='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <a href={createImageLink}>{title}</a>
                </div>
                <div className='scrollable'>
                  <div className='modal-body'>
                    <img src={modalImageUrl} alt={title} />
                  </div>
                  <div className='modal-footer'>

                    <small className='description' dangerouslySetInnerHTML={{ __html: description }} />
                    <hr />
                    {imageTags}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

ImageTile.propTypes = {
  item: PropTypes.object.isRequired,
  callback: PropTypes.func
}

export default ImageTile
