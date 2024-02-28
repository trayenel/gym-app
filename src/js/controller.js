import * as app from "./app.js";
import calendarView from "./Views/calendarView.js";
import navView from "./Views/navView.js";
import modalView from "./Views/modalView.js";
import trackView from "./Views/trackView.js";

const controlNav = function () {
  calendarView.renderDates(app);
};

const controlSidebar = function () {
  navView.showSidebar();
  navView.hideSidebar();
  navView.sidebarChooseView(controlView);
};

const controlView = function () {
  calendarView.toggleView();
  trackView.toggleView();
};

const controlModal = function () {
  modalView.showModal();
};

const renderWorkout = function () {
  trackView.renderWorkout();
};

function init() {
  controlSidebar();
  modalView.closeModal();
  navView.changeMonth(app);
  navView.addHandlerRender(controlNav);
  calendarView.renderDates(app);
  calendarView.addHandlerRender(controlModal);
  trackView.addHandlerRender(renderWorkout);
  trackView.selectWorkout();
  trackView.renderExercicesSearch()
  trackView.addEx()
}

document.querySelector(".mama").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(app.state);
});

init();

