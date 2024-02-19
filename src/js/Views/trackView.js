import * as app from "../app.js";
import View from "./View.js";
import { state } from "../app.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _exercicesList = document.querySelector(".exercice-list");
  _workoutAdder = document.querySelector(".add-workout");
  _searchBar = document.getElementById("search");
  _workout;
  _submit;
  addHandlerRender(handler) {
    this._tracker.addEventListener("click", function (e) {
      if (e.target.classList.contains("icon")) handler();
    });
  }

  renderWorkout() {
    const htmltext = `<span data-id=${Math.random().toString(36).slice(2, 9)} class="workout active"
            ><label for="submitWorkout"></label>
            <input type="text" class="submitWorkout active"
          /></span>`;

    if (!this._submit?.classList.contains("active")) {
      this._workoutAdder.insertAdjacentHTML("beforebegin", htmltext);
      this.nameWorkout();
    }
  }

  nameWorkout() {
    if (this._workout?.classList.contains("active"))
      this._workout.classList.toggle("active");
    const temp = this?._workout;
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
            );
            app.stateWorkoutSelect(this._workout.dataset.id);
            this.renderWorkoutList();
          }
        }
        if (e.key === "Escape") {
          this._submit.classList.toggle("active");
          temp.classList.add('active')
          this._workout.remove();
          this._workout = temp;
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
          this.renderWorkoutList();
        }
      }.bind(this),
    );
  }
  renderWorkoutList() {
    this._exercicesList.innerHTML = "";
    if (!state._selectedWorkout.Exercices) return;

    state._selectedWorkout.Exercices.forEach((wk) => {
      const html = `<span class="exercice">${wk}</span>`;
      this._exercicesList.insertAdjacentHTML("afterbegin", html);
    });
  }

  searchWorkout() {
    this._searchBar.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        app.addExercice("belire de caras");
        this.renderWorkoutList();
      }.bind(this),
    );
  }
}

export default new TrackView();
