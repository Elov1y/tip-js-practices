import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

console.log("ПР2. Демонстрационный сценарий");
console.log("Количество задач в общем наборе:", demoTasks.length);
console.log("Номер варианта:", variantNumber);
console.log(
  "Количество задач в индивидуальном наборе:",
  variantTasks.length
);

// Сохраняем исходное состояние для проверки неизменности demoTasks.
const demoTasksBefore = JSON.stringify(demoTasks);

let currentTasks = demoTasks;

console.log("\n--- Исходный набор ---");
console.table(currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные задачи:", getPendingTasks(currentTasks));

const { total, completed, pending, progress } = getTaskStats(currentTasks);

console.log("Сводка:", {
  total,
  completed,
  pending,
  progress,
});

// Добавление задачи id 20.
let result = addTask(currentTasks, 20, "Добавить проверку", "high");

if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.log("Ошибка:", result.error);
}

console.log("\n--- После добавления id 20 ---");
console.table(currentTasks);
console.log("Сводка:", getTaskStats(currentTasks));

// Выполнение задачи id 4.
result = setTaskCompleted(currentTasks, 4, true);

if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.log("Ошибка:", result.error);
}

console.log("\n--- После выполнения id 4 ---");
console.table(currentTasks);
console.log("Сводка:", getTaskStats(currentTasks));

// Переименование задачи id 10.
result = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");

if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.log("Ошибка:", result.error);
}

console.log("\n--- После переименования id 10 ---");
console.table(currentTasks);
console.log("Сводка:", getTaskStats(currentTasks));

// Удаление задачи id 7.
result = removeTask(currentTasks, 7);

if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.log("Ошибка:", result.error);
}

console.log("\n--- После удаления id 7 ---");
console.table(currentTasks);
console.log("Сводка:", getTaskStats(currentTasks));

// Обработка ошибки.
// Пытаемся удалить задачу с несуществующим id.
result = removeTask(currentTasks, 999);

if (!result.ok) {
  console.log("\n--- Обработанная ошибка ---");
  console.log("Ошибка:", result.error);
  console.log("Состояние после ошибки не изменилось.");
}

// Итоговые идентификаторы.
console.log("\n--- Итоговые идентификаторы ---");
console.log(currentTasks.map((task) => task.id));

// Проверка неизменности demoTasks.
const demoTasksAfter = JSON.stringify(demoTasks);

console.log("\n--- Проверка исходного demoTasks ---");
console.log(
  "demoTasks не изменён:",
  demoTasksBefore === demoTasksAfter
);
console.table(demoTasks);

const variantTasksBefore = JSON.stringify(variantTasks);

let variantCurrentTasks = variantTasks;

console.log("\n--- Исходный индивидуальный набор ---");
console.table(variantCurrentTasks);
console.log("Сводка:", getTaskStats(variantCurrentTasks));

// Добавление id 80.
result = addTask(
  variantCurrentTasks,
  80,
  "Подготовить материалы для семинара",
  "high"
);

if (result.ok) {
  variantCurrentTasks = result.tasks;
}

console.log("\n--- После добавления id 80 ---");
console.table(variantCurrentTasks);
console.log("Сводка:", getTaskStats(variantCurrentTasks));

// Выполнение id 11.
result = setTaskCompleted(variantCurrentTasks, 11, true);

if (result.ok) {
  variantCurrentTasks = result.tasks;
}

console.log("\n--- После выполнения id 11 ---");
console.table(variantCurrentTasks);
console.log("Сводка:", getTaskStats(variantCurrentTasks));

// Переименование id 23.
result = renameTask(
  variantCurrentTasks,
  23,
  "Уточнить план семинара"
);

if (result.ok) {
  variantCurrentTasks = result.tasks;
}

console.log("\n--- После переименования id 23 ---");
console.table(variantCurrentTasks);
console.log("Сводка:", getTaskStats(variantCurrentTasks));

// Удаление id 37.
result = removeTask(variantCurrentTasks, 37);

if (result.ok) {
  variantCurrentTasks = result.tasks;
}

console.log("\n--- После удаления id 37 ---");
console.table(variantCurrentTasks);
console.log("Сводка:", getTaskStats(variantCurrentTasks));

// Повторное добавление id 80.
const variantBeforeDuplicate = variantCurrentTasks;

result = addTask(
  variantCurrentTasks,
  80,
  "Дубликат задачи",
  "high"
);

console.log("\n--- Повторное добавление id 80 ---");

if (!result.ok) {
  console.log("Ожидаемый отказ:", result.error);
  console.log(
    "Список не изменился:",
    variantCurrentTasks === variantBeforeDuplicate
  );
}

// Отдельный сценарий для индивидуального набора.
console.log("\n--- Индивидуальный набор variantTasks ---");
console.table(variantTasks);
console.log("Сводка variantTasks:", getTaskStats(variantTasks));
console.log("Названия:", getTaskTitles(variantTasks));
console.log(
  "Количество невыполненных:",
  getPendingTasks(variantTasks).length
);

// Поиск первой задачи индивидуального набора.
if (variantTasks.length > 0) {
  console.log(
    "Первая задача variantTasks:",
    findTaskById(variantTasks, variantTasks[0].id)
  );
}

console.log("\n--- Итог индивидуального сценария ---");
console.table(variantCurrentTasks);
console.log(
  "Итоговая сводка:",
  getTaskStats(variantCurrentTasks)
);
console.log(
  "Итоговые идентификаторы:",
  variantCurrentTasks.map((task) => task.id)
);

const variantTasksAfter = JSON.stringify(variantTasks);

console.log(
  "variantTasks не изменён:",
  variantTasksBefore === variantTasksAfter
);

// Дополнительная проверка createTask().
console.log("\n--- Проверка createTask ---");
console.log(
  createTask(100, "Новая тестовая задача", "medium")
);