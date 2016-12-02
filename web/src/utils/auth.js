const Auth0Lock = require('auth0-lock').default
const moment = require('moment')
const jwtDecode = require('jwt-decode')

module.exports = function(clientId, domain) {
  const lock = new Auth0Lock(clientId, domain, {})

  lock.on('authenticated', _doAuthentication)

  function login() {
    lock.show()
  }

  let notifyFunction

  function _doAuthentication(authResult) {
    setToken(authResult.idToken)
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) return console.log(error.message)
      localStorage.setItem('profile', JSON.stringify(profile))
      if (notifyFunction) { notifyFunction(profile) }
    })
  }

  function logout() {
    localStorage.removeItem('id_token')
  }

  function setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  function getToken() {
    return localStorage.getItem('id_token')
  }

  function loggedIn() {
    return !!getToken()   // Forces a boolean to return instead of value or undefined
  }                       //  Could be getToken() ? true : false

  function notify(fn) {
    notifyFunction = fn
  }

  if (getToken()) {
    const info = jwtDecode(getToken())
    if (moment().isBefore(moment.unix(info.exp))) {
      logout()
    }
  }

  return {
    login,
    logout,
    loggedIn,
    setToken,
    getToken,
    notify
  }
}
