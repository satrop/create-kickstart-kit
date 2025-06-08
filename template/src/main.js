import '@shoelace-style/shoelace/dist/shoelace.js'
import initDialog from './components/initDialog.js'
// Add other imports like initAlert, initTabs etc when needed

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing components...')

  initDialog()

  // Add other initializers here
  // initAlert()
  // initTabs()
})