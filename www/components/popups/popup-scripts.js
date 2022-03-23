const openModalbuyButtons = document.querySelectorAll('[data-modalbuy-target]')
const openModalsellButtons = document.querySelectorAll('[data-modalsell-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const buyoverlay = document.getElementById('buyoverlay')
const selloverlay = document.getElementById('selloverlay')


openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modalbuy.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modalbuy')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}