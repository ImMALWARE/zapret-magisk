const generalModal = document.getElementById("general-modal");
const generalModalTitle = document.getElementById("general-modal-title");
const generalModalBody = document.getElementById("general-modal-body");

export function showGeneralModal(title, body) {
  generalModalTitle.textContent = title;
  generalModalBody.innerHTML = body;
  generalModal.classList.replace("max", "modal");
  generalModal.showModal();
}

export function showFullscreenModal(title, body) {
  generalModalTitle.textContent = title;
  generalModalBody.innerHTML = body;
  generalModal.classList.replace("modal", "max");
  generalModal.showModal();
}


// для теста
window.test = showGeneralModal
window.test2 = showFullscreenModal
