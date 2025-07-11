const outputModal = document.getElementById("output-modal");
const outputModalTitle = document.getElementById("output-modal-title");
const outputModalBody = document.getElementById("output-modal-body");
const outputBootstrapModal = new bootstrap.Modal(outputModal);

window.modal = function (title, message) {
  outputModalTitle.textContent = title;
  outputModalBody.textContent = message;
  outputBootstrapModal.show();
};
