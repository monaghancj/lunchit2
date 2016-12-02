const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()
const { map } = require('ramda')
const Favorites = React.createClass({
  getInitialState() {
    return {
      favorites: []
    }
  },
  componentDidMount () {
    data.list('favorites')
      .then(favorites => this.setState({favorites}))
      .catch(err => {
        this.props.logout()
      })
  },
  render () {
    const transform = map(fav => {
      return <div key={fav.id}>
               <Link
                 className="no-underline"
                 to={`/favorites/${fav.id}/show`}>
                 {fav.name}
               </Link>
             </div>
    })
    return (
      <div>
        <header>
          <h1>Favorites</h1>
          <Link
            className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-green"
            to="/favorites/new">New Favorite</Link>
        </header>
        {transform(this.state.favorites)}
        <Link
          className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-blue"
          to={"/"}>
            Home
        </Link>
      </div>
    )
  }
})

module.exports = Favorites
