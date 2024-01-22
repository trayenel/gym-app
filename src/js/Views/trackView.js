import * as app from "../app.js";
import View from "./View.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _workoutAdder = document.querySelector(".add-workout");
  _exercices = [];
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

    this._workout = document.querySelector(".workout.active");

    this._submit = document.querySelector(".submitWorkout.active");
    console.log(this._workout)

    this._submit.focus();
    this._submit.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Enter") {
          if (this._submit.value !== "") {
            this._submit.classList.toggle("active");
            this._workout.innerHTML = this._submit.value;
            app.createNewWorkout(this._workout.dataset.id, this._workout.innerHTML);
            app.stateWorkoutSelect(this._workout.dataset.id);
          }
        }
        if (e.key === "Escape") {
          this._submit.classList.toggle("active");
          this._workout.remove();
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
        }
      }.bind(this),
    );
  }
  addExercice() {
    this._exercices.push("Belit de caras");
    app.editWorkout(this._exercices);
  }
}

export default new TrackView();
