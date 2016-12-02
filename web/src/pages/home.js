const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  getInitialState: function() {
    return {
      picture: 'http://placekitten.com/60',
      nickname: 'Kitty'
    };
  },
  componentDidMount: function() {
    this.props.auth.notify(profile => {
      this.setState({
        picture: profile.picture,
        nickname: profile.nickname
      })
    })

    if (!this.props.auth.loggedIn()
            && this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
    if (localStorage.getItem('profile')) {
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.setState({
        picture: profile.picture,
        nickname: profile.nickname
      })
    }
  },
  render() {
    return (
      <div>
        <div className="ib">
          <img className="br-100 w-20 h-20" src={this.state.picture} role="presentation"/>
          <p>{this.state.nickname}</p>
          <div><button onClick={this.logout}>Logout</button></div>
        </div>
        <main>
          <h1 className="light-green">Lunch<span className="green">It</span></h1>
          <h3>Menu</h3>
          <ul className="list">
            <li>
              <Link className="no-underline" to="/favorites">Favorites</Link>
            </li>
            <li>
              <a className="no-underline" href="">Circles</a>
            </li>
            <li>
              <Link className="no-underline" to="/about">About</Link>
            </li>
          </ul>
        </main>
      </div>
    )
  }
})

module.exports = Home
