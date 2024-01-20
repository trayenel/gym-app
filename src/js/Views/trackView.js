import View from "./View.js";

class TrackView extends View {
  _main = document.querySelector(".track-view");
  _tracker = document.querySelector(".tracker");
  _workoutAdder = document.querySelector(".add-workout");

  addHandler(handler) {

  }

  addWorkout() {
    this._tracker.addEventListener(
      "click",
      function (e) {
        const htmltext = `<span class="workout"
            ><label for="submitWorkout"></label>
            <input type="text" class="submitWorkout"
          /></span>`;

        if (e.target.classList.contains("icon")) {
          this._workoutAdder.insertAdjacentHTML("beforebegin", htmltext);
        }
      }.bind(this),
    );

    const workout = document.querySelector(".workout");

    const submit = document.querySelector(".submitWorkout");

    submit.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        alert("sloboz");
      }
    });
  }
}

export default new TrackView();
