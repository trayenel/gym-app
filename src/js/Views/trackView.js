import View from "./View.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _workoutAdder = document.querySelector(".add-workout");
  _workout;
  _submit;
  addHandler(handler) {
    this._tracker.addEventListener("click", function (e) {
      if (e.target.classList.contains("icon")) handler();
    });
  }

  addWorkout() {
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
    this._workout = document.querySelector(".workout.active");

    this._submit = document.querySelector(".submitWorkout.active");

    this._submit.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Enter") {
          this._workout.classList.toggle("active");
          this._submit.classList.toggle("active");
          this._workout.innerHTML = this._submit.value;
        }
      }.bind(this),
    );
  }
}

export default new TrackView();
