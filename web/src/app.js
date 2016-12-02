const React = require('react')
const { Match, BrowserRouter, HashRouter, Redirect } = require('react-router')
const { Home, About, Favorites, FavoriteForm, Favorite } = require('./pages')

const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)

const App = React.createClass({
  logout(e) {
    auth.logout()
    this.setState({loggedIn: false})
  },

  render() {
    return (
      <HashRouter>
        <div className="ma3 helvetica">
          {/* { this.state.logout ? <Redirect to="/" /> : null } */}
          <Match exactly pattern="/" render={(props) => <Home {...props} auth={auth} />}/>
          <MatchWhenAuthorized exactly pattern="/favorites" component={Favorites} logout={this.logout} />  {/*component is a prop*/}
          <MatchWhenAuthorized pattern="/favorites/new" component={FavoriteForm} logout={this.logout} />
          <MatchWhenAuthorized exactly pattern="/favorites/:id/show" component={Favorite} logout={this.logout}/>
          <MatchWhenAuthorized pattern="/favorites/:id/edit" component={FavoriteForm} logout={this.logout}/>
          <MatchWhenAuthorized pattern="/about" component={About} logout={this.logout}/>
        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized = ({component: Component, logout: logout, ...rest}) =>    //...rest operator pust the rest of the arguments in
  <Match {...rest} render={props => auth.loggedIn()
    ? <div>
      <div style={{float:'right'}}>
        <button
          className="f6 grow link dim br-pill ba bw1 ph3 pv2 mb2 dib silver hover-dark-red"
          onClick={logout}>
            Log Out
        </button>
      </div>
      <Component {...props} logout={logout} />
    </div>
    : <Redirect to="/" />
  } />

module.exports = App
