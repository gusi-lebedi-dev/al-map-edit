const qs = el => document.querySelector(el)
const qsa = el => document.querySelectorAll(el)

const svgGo = () => {
    qs('#svg-container').innerHTML = qs('#svg-input').value

    init();
}
qs('#svg-go').addEventListener('click', () => svgGo())

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('app-svg-code')) {
        qs('#svg-input').value = localStorage.getItem('app-svg-code')
        svgGo()
    }
})

let currentPath = null
const init = () => {
    qsa('#svg-container path').forEach(el => {
        el.addEventListener('click', () => {
            currentPath = el
            openModal()
        })
    })
}

const modal = qs('#modal')
const modalLocation = qs('#modal-country')
const modalNumber = qs('#modal-number')
const modalTotal = qs('#modal-total')
const openModal = () => {
    if (currentPath.getAttribute('data-country')) {
        modalLocation.value = currentPath.getAttribute('data-country')
        modalNumber.value = currentPath.getAttribute('data-number')
        modalTotal.value = currentPath.getAttribute('data-total')
    }
    modal.style.display = 'flex'
}
const closeModal = () => {
    modalTotal.value = '';
    modalNumber.value = '';
    modalLocation.value = '';
    currentPath = null
    modal.style.display = 'none'
}
const saveModal = () => {
    if (modalLocation.value && modalTotal.value && modalNumber.value) {
        currentPath.setAttribute('data-country', modalLocation.value)
        currentPath.setAttribute('title', modalLocation.value)
        currentPath.setAttribute('data-number', modalNumber.value)
        currentPath.setAttribute('data-total', modalTotal.value)

        const outputSVG = qs('#svg-container').innerHTML
        localStorage.setItem('app-svg-code', outputSVG)
        qs('#svg-input').value = outputSVG

        closeModal()
    }
}