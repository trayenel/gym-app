class modalView {
  _main = document.querySelector(".workout-modal");

  closeModal() {
    this._main.addEventListener(
      "click",
      function (e) {
        if (
          e.target.classList.contains("close-btn") ||
          e.target.classList.contains("overlay")
        ) {
          this._main.classList.toggle("hidden");
        }
      }.bind(this),
    );
  }
  showModal() {
    this._main.classList.toggle("hidden");
  }
}

export default new modalView();
