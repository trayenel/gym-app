class modalView {
  _window = document.querySelector(".workout-modal");

  closeModal() {
    this._window.addEventListener("click", function (e) {
        if (e.target.classList.contains('close-btn') || e.target.classList.contains('overlay')) {
            this._window.classList.toggle('hidden');
        }
    }.bind(this));
  }
  showModal() {
      this._window.classList.toggle('hidden')
  }
}

export default new modalView();
