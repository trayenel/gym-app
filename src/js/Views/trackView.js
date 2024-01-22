import * as app from "../app.js"
import View from "./View.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _workoutAdder = document.querySelector(".add-workout");
  _workout;
  _submit;
  addHandlerRender(handler) {
    this._tracker.addEventListener("click", function (e) {
      if (e.target.classList.contains("icon")) handler();
    });
  }

  renderWorkout() {
    const htmltext = `<span class="workout active"
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

    this._submit.focus();
    this._submit.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Enter") {
          if (this._submit.value !== "") {
            this._submit.classList.toggle("active");
            this._workout.innerHTML = this._submit.value;
            app.createNewWorkout(this._workout.innerHTML)
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
        }
      }.bind(this),
    );
  }
}

export default new TrackView();
