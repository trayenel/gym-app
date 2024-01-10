import * as app from "./app.js";
import calendarView from "./Views/calendarView.js";
import navView from "./Views/navView.js";
import modalView from "./Views/modalView.js";

const controlNav = function () {
  calendarView.renderDates(app);
};

const controlView = function () {
  calendarView.toggleCalendar()
}

const controlModal = function () {
  modalView.showModal()
}

function init() {
  navView.showSidebar();
  navView.hideSidebar();
  navView.changeMonth(app);
  calendarView.renderDates(app);
  calendarView.addHandlerRender(controlModal)
  navView.addHandlerRender(controlNav);
  modalView.closeModal()
  navView.sidebarChooseView(controlView)
}

init();