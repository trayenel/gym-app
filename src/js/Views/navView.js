class navView {
  _navbar = document.querySelector(".navbar");
  _sidebar = document.querySelector(".sidebar");

  showSidebar() {
    this._navbar.addEventListener("mouseover", function (e) {
      if (
        e.target.classList.contains("settings-btn") ||
        e.target.parentNode.classList.contains("settings-btn")
      ) {
        document.querySelector(".sidebar").style.width = "10%";
      }
    });
  }

  sidebarChooseView(calendar) {
    this._sidebar.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        if (e.target.classList.contains("track-view-btn")) {
          if (
            !this._navbar.children[1].classList.contains("hidden") &&
            !this._navbar.children[2].classList.contains("hidden")
          ) {
            this._navbar.children[1].classList.toggle("hidden");
            this._navbar.children[2].classList.toggle("hidden");
          }
          calendar()
        }
      }.bind(this),
    );
  }

  hideSidebar() {
    this._sidebar.addEventListener("mouseleave", function (e) {
      e.preventDefault();
      document.querySelector(".sidebar").style.width = "0";
    });
  }

  addHandlerRender(functzie) {
    this._navbar.children[2].addEventListener("click", functzie);
  }

  changeMonth(model) {
    this._navbar.children[2].addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-right")) {
        model.increaseMonth();
      } else if (e.target.classList.contains("btn-left")) {
        model.decreaseMonth();
      } else {
        model.today();
      }
    });
  }
}

export default new navView();