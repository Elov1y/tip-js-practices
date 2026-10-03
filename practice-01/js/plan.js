"use strict";

const totalTasks = 20;
const completedTasks = 11;
const dailyLimit = 6;

if (
  !Number.isFinite(totalTasks) ||
  !Number.isFinite(completedTasks) ||
  !Number.isFinite(dailyLimit) ||
  !Number.isInteger(totalTasks) ||
  !Number.isInteger(completedTasks) ||
  !Number.isInteger(dailyLimit)
) {
  console.log("Ошибка: значения должны быть целыми числами");
} else if (
  totalTasks < 0 ||
  totalTasks > 1000 ||
  completedTasks < 0 ||
  completedTasks > totalTasks
) {
  console.log("Ошибка: некорректное количество задач");
} else if (dailyLimit < 1 || dailyLimit > 1000) {
  console.log("Ошибка: дневная норма должна быть от 1 до 1000");
} else {
  let remainingTasks = totalTasks - completedTasks;
  let day = 0;

  console.log(`Осталось задач: ${remainingTasks}`);

  while (remainingTasks > 0) {
    day += 1;

    const tasksToday = Math.min(dailyLimit, remainingTasks);
    remainingTasks -= tasksToday;

    console.log(
      `День ${day}: выполнено ${tasksToday}, осталось ${remainingTasks}`
    );
  }

  console.log(`Потребуется дней: ${day}`);
}