/* global document, window, feathers, io */

// Establish a Socket.io connection
const socket = io()
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers()

client.configure(feathers.socketio(socket))
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}))

const loginBtn = document.getElementById('login')
const username = document.getElementById('username')
const password = document.getElementById('password')

loginBtn.addEventListener('click', (ev) => {
  ev.preventDefault()
  console.log('login', { strategy: 'local', email: username.value, password: password.value })
  client.authenticate({ strategy: 'local', email: username.value, password: password.value })
})
