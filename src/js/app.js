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
  _weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  _workouts: new Map(),
  _selectedWorkout: null,
  _selectedYear: new Date().getFullYear(),
  _selectedMonth: new Date().getMonth(),
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
  day = new Date().getDate(),
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

  return [paddingDays, daysInMonth, year, month, state._months, day];
};

export const createNewWorkout = function (id, name) {
  const workout = {
    name: name,
  };
  state._workouts.set(`${id}`, workout);
};

export const stateWorkoutSelect = function (workout) {
  state._selectedWorkout = state._workouts.get(workout);
};

export const addExercice = function (ex) {
  if (!state._selectedWorkout) return
    if (!state._selectedWorkout.Exercices)
      state._selectedWorkout.Exercices = [];
  state._selectedWorkout?.Exercices.push(ex);
};

export const search = async function (searchInput) {
  try {
    const api_data = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${searchInput}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f6054408b3msh40729f61b8a77a6p17de8ajsn0ee3785396bb",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      },
    );
    return await api_data.json();
  } catch (e) {
    console.error(e);
  }
};
