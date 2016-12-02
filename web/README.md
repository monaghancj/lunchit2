# Adding Authentication with Auth0Lock

## Need:
* auth0-lock    --> Main Component to provide Authentication
* jwt-validate  --> middleware
* express-jwt

## Step 1 - Setup
Make sure you are signed up on Auth0Lock
This webpage will hold information needed to link up to your app
* Add your url (localhost:3000) to Allowed Callback URLs under clients settings
* In your .env web file add REACT_ACT_ID and REACT_APP_DOMAIN, these will correlate to the values found under clients settings
* In your .env api file add AUTH0_ID and AUTH0_SECRET, these will correlate to Client ID and Secret under Clients settings
* Add '-m ./jwt-validate.js' to the end of your start script under api's package.json


## Step 2 - Necessary files
Create Auth-service.js file to manage Auth0's user login and tokens
* Will be Auth component
* Works with localStorage to add and remove your id_token
Create Auth.js file to work directly with Auth0's interface widget
* Keeps track of loggedIn status and handles result of authentication
Create jwt-validate.js file to get token from request and validate using jwt
* Get the jwt token from request
* Verify the token against our secret
* If valid ? continue : access denied 403

## Step 3 -
Instantiate Auth in app.js and gain access to its methods
Create a logout function in app.js and use Auth's logout method
* auth.logout()
Pass this function into each Match Component as a prop
* logout={this.logout}
* Now all Components/pages will require login

## Step 4 - Conform Match Components
Match components must show only if logged in
* Use auth's loggedIn method to see if user is logged In
* --> Yes ? pass Match Component : Redirect back home '/'

## Step - Get user data
We instantiated our Auth0Lock in Auth.js - this is where user data license
* const lock = new Auth0Lock(clientId, domain, {})  --> clientId and domain populated by config .env
* lock.getUserInfo(accessToken, (err, result) => {save profile to storage})

------------------
