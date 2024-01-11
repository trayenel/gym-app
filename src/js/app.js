export const state = {
  _nav: 0,
  _months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  _workouts: [],
  _clicked: null,
  _selectedYear: new Date().getFullYear(),
  _selectedMonth: new Date().getMonth(),
  _weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

export const today = function () {
  state._selectedYear = new Date().getFullYear();
  state._selectedMonth = new Date().getMonth();
};

export const increaseMonth = function () {
  state._selectedMonth += 1;
  if (state._selectedMonth > 11) {
    state._selectedMonth = 0;
    state._selectedYear += 1;
  }
};

export const decreaseMonth = function () {
  state._selectedMonth -= 1;
  if (state._selectedMonth < 0) {
    state._selectedMonth = 11;
    state._selectedYear -= 1;
  }
};

export const calculateDate = function (
  year = state._selectedYear,
  month = state._selectedMonth,
) {
  /*We calculate the total amount of days in a month by referring to the next month from which we subtract one day and the current month's first day*/
  const firstDayInMonth = new Date(
    state._selectedYear,
    state._selectedMonth,
    1,
  );
  const daysInMonth = new Date(
    state._selectedYear,
    state._selectedMonth + 1,
    0,
  ).getDate();

  /*Then we calculate the day of the week which the month starts on, and we pull the index of the day from the weekdays array*/
  const dateString = firstDayInMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = state._weekdays.indexOf(dateString.split(", ")[0]);

  return [paddingDays, daysInMonth, year, month, state._months];
};
