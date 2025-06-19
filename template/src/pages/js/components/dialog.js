const initDialog = async () => {
  // Wait for DOM to be ready
  const button = document.querySelector('#open-dialog')
  const dialog = document.querySelector('#my-dialog')

  if (button && dialog) {
    button.addEventListener('click', () => {
      dialog.showModal()
    })
  } else {
    console.warn('Dialog or button not found in DOM.')
  }
}

export default initDialog