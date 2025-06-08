const initDialog = async () => {
  // Wait for custom element definition (good for Shoelace)
  await customElements.whenDefined('sl-dialog')

  const button = document.querySelector('#open-dialog')
  const dialog = document.querySelector('#my-dialog')

  if (button && dialog) {
    button.addEventListener('click', () => {
      dialog.show()
    })
  } else {
    console.warn('Dialog or button not found in DOM.')
  }
}

export default initDialog