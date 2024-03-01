import * as app from "../app.js";
import View from "./View.js";
import { state } from "../app.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _trackMenu = document.querySelector(".track-menu");
  _exercicesList = document.querySelector(".exercice-list");
  _addedExercices = document.querySelector(".added-exercices");
  _workoutAdder = document.querySelector(".add-workout");
  _searchBar = document.getElementById("search");
  _dateMenu;
  _workout;
  _submit;

  addHandlerRender(handler) {
    this._tracker.addEventListener("click", function (e) {
      if (e.target.classList.contains("icon")) handler();
    });
  }

  addEx() {
    this._trackMenu.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains("list-element")) {
          app.addExercice(e.target.innerHTML);
          this.renderAddedExercices();
          this._searchBar.innerHTML = "";
          this._exercicesList.innerHTML = "";
        }
      }.bind(this),
    );
  }

  renderWorkout() {
    const htmltext = `<span data-id=${Math.random().toString(36).slice(2, 9)} class="workout active"
            ><label for="submitWorkout"></label>
            <label for="date"></label>
            <input type="text" class="submitWorkout active"/>
            <input id="date" type="date"/></span>`;
    if (!this._submit?.classList.contains("active")) {
      this._workoutAdder.insertAdjacentHTML("beforebegin", htmltext);

      this.addWorkout();
    }
  }

  addWorkout() {
    this.getDate();
    if (this._workout?.classList.contains("active"))
      this._workout.classList.toggle("active");
    const temp = this?._workout;
    app.stateWorkoutSelect(null);
    this._workout = document.querySelector(".workout.active");
    this._submit = document.querySelector(".submitWorkout.active");
    this._submit.focus();
    this._submit.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Enter") {
          if (this._submit.value !== "") {
            this._submit.classList.toggle("active");
            this._workout.innerHTML = this._submit.value;
            app.createNewWorkout(
              this._workout.dataset.id,
              this._workout.innerHTML,
              this.setDate().toDateString(),
            );
            app.stateWorkoutSelect(this._workout.dataset.id);
            this.renderAddedExercices();
          }
        }
        if (e.key === "Escape") {
          this._submit.classList.toggle("active");
          temp?.classList.add("active");
          this._workout.remove();
          this._workout = temp;
          app.stateWorkoutSelect(this._workout?.dataset.id);
        }
      }.bind(this),
    );
  }

  selectWorkout() {
    this._tracker.addEventListener(
      "click",
      function (e) {
        if (e.target.classList.contains("workout.active")) return;
        if (
          e.target.classList.contains("workout") &&
          !e.target.classList.contains("active") &&
          !this._submit.classList.contains("active")
        ) {
          this._workout.classList.toggle("active");
          this._workout = e.target;
          this._workout.classList.toggle("active");
          app.stateWorkoutSelect(this._workout.dataset.id);
          this.renderAddedExercices();
        }
      }.bind(this),
    );
  }

  renderAddedExercices() {
    this._addedExercices.innerHTML = "";
    if (!state._selectedWorkout.Exercices) return;

    state._selectedWorkout.Exercices.forEach((ex) => {
      const html = `<span class="exercice">${ex}</span>`;
      this._addedExercices.insertAdjacentHTML("beforeend", html);
    });
  }

  renderExercicesSearch() {
    this._searchBar.addEventListener(
      "keyup",
      function (e) {
        if (!state._selectedWorkout || this._searchBar.value.length < 3) return;
        console.log("merge");
        this._exercicesList.innerHTML = "";
        app.search(this._searchBar.value).then((data) => {
          for (let i = 0; i < data.length; i++) {
            this._exercicesList.innerHTML += `<li class="list-element">${data[i].name}</li>`;
          }
        });
      }.bind(this),
    );
  }

  getDate() {
    this._dateMenu = document.getElementById("date");
    this._dateMenu.valueAsDate = new Date();
  }
  setDate() {
    let date = this._dateMenu.valueAsDate;
    this._dateMenu.addEventListener(
      "change",
      (e) => (date = this._dateMenu.valueAsDate),
    );
    return date;
  }
}

export default new TrackView();
