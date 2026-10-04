"use strict";

const totalTasks = 5;
const completedTasks = 6;

if (
    !Number.isFinite(totalTasks) ||
    !Number.isFinite(completedTasks) ||
    !Number.isInteger(totalTasks) ||
    !Number.isInteger(completedTasks)
) {
    console.log("ошибка: кол-во задач должно быть целым числом");
} else if (
    totalTasks < 0 ||
    totalTasks > 1000 ||
    completedTasks < 0 ||
    completedTasks > 1000
) {
    console.log("Ошибка: кол-во задач должно быть от 0 до 1000");
} else if (completedTasks > totalTasks){
    console.log("Ошибка: выполнено больше задач, чем существует");
} else if (totalTasks === 0 && completedTasks === 0){
    console.log("Задач пока нет");
} else {
    const remainingTasks = totalTasks - completedTasks;
    const progress = (completedTasks / totalTasks) * 100;
    let status;
    if (completedTasks === 0){
        status = "Не начато";
    } else if (completedTasks === totalTasks){
        status = "Завершено";
    } else {
        status = "В работе";
    }
    console.log(`Всего задач: ${totalTasks}`);
    console.log(`Выполнено: ${completedTasks}`);
    console.log(`Осталось: ${remainingTasks}`);
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
    console.log(`Статус: ${status}`);
}