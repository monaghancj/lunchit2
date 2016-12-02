const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
import confirm from 'react-confirm2'

const Favorite = React.createClass({
  getInitialState: function() {
    return {
      favorite: {
        id: '',
        name: ''
      },
      removed: false
    };
  },
  componentDidMount: function() {
    data.get('favorites', this.props.params.id)
      .then(favorite => this.setState({favorite}))
  },
  handleRemove(e){
    e.preventDefault()
    confirm('Are you sure?', () => {
      data.remove('favorites', this.props.params.id, this.state.favorite)
        .then(favorite => this.setState({removed: true}))
    })
  },
  render() {
    return (
      <div>
        { this.state.removed ? <Redirect to="/favorites"/> : null }
        <h1>{this.state.favorite.name}</h1>
          <Link   //Not finished
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-blue"
            to={`/favorites/${this.state.favorite.id}/edit`}>
            Edit
          </Link>
          <a
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 mr1 dib silver hover-red"
            onClick={this.handleRemove}>
              Remove
          </a>
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
            to={"/favorites"}>
              Return
          </Link>
      </div>
    )
  }
})

module.exports = Favorite
