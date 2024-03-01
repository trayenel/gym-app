import View from "./View.js";

class CalendarView extends View {
  _main = document.querySelector(".calendar");
  _monthText = document.querySelector(".month");
  renderDates(app) {
    /*First import the date variables from the calcDate function*/
    const [paddingDays, daysInMonth, year, month, months, day] =
      app.calculateDate();
    /*Render the month using the current month and the index of the months array*/
    this._monthText.innerHTML = months[month];
    /*Render the calendar taking into account the padding days and total days of the month*/
    const table = this._main.children[1];

    for (let i = 0; i < 6; i++) {
      let row = table.rows[i];
      for (let j = 0; j < row.cells.length; j++) {
        let daynumber = i * 7 + j + 1 - paddingDays;
        let cell = row.cells[j];
        cell.classList.add("day");
        cell.style.backgroundColor = "white";
        if (
          daynumber === day &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear()
        )
          cell.style.backgroundColor = "green";

        if (daynumber > daysInMonth) {
          daynumber = i * 7 + j + 1 - paddingDays - daysInMonth;
          cell.style.backgroundColor = "grey";
          cell.classList.toggle("day");
        }

        if (daynumber <= 0) {
          cell.style.backgroundColor = "grey";
          cell.classList.toggle("day");
        }

        cell.textContent = new Date(year, month, daynumber).getDate();
      }
    }
  }

  addHandlerRender(handler) {
    this._main.addEventListener("click", function (e) {
      if (e.target.classList.contains("day")) {
        handler();
      }
    });
  }

  /*renderWorkoutView() {
    this._main.addEventListener("click", function (e) {
      if (e.target.classList.contains("day")) {
        return e.target.textContent;
      }
    });
  }*/
}

export default new CalendarView();
