import * as app from "./app.js";
import calendarView from "./Views/calendarView.js";
import navView from "./Views/navView.js";
import modalView from "./Views/modalView.js";
import trackView from "./Views/trackView.js";

const controlNav = function () {
  calendarView.renderDates(app);
};

const controlView = function () {
  calendarView.toggleView();
  trackView.toggleView();
};

const controlModal = function () {
  modalView.showModal();
};

const addWorkout = function () {
  trackView.addWorkout()

}

function init() {
  navView.showSidebar();
  navView.hideSidebar();
  navView.changeMonth(app);
  navView.sidebarChooseView(controlView);
  navView.addHandlerRender(controlNav);
  modalView.closeModal();
  calendarView.renderDates(app);
  calendarView.addHandlerRender(controlModal);
  trackView.addHandler(addWorkout)
  trackView.selectWorkout()
}

init();
