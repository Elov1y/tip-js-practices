// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

export function createTask(id, title, priority = "medium") {
  if (!Number.isSafeInteger(id) || id <= 0){
    return {
      ok: false,
      error: "id должен быть положительным безопасным целым числом",
    };
  }

  if (typeof title !== "string"){
    return {
      ok: false,
      error: "title должен быть строкой",
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 1 || trimmedTitle.length > 100){
    return {
      ok: false,
      error: "title должен содержать от 1 до 100 символов",
    };
  }

  if (!["low", "medium", "high"].includes(priority)){
    return {
      ok: false,
      error: "priority должен быть low, medium или high",
    };
  }

  return {
    ok: true,
    task: {
      id,
      title: trimmedTitle,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  return{
    total,
    completed,
    pending,
    progress,
  };
}

export function addTask(tasks, id, title, priority = "medium") {
  const result = createTask(id, title, priority);

  if (!result.ok) {
    return result;
  }

  if (tasks.some((task) => task.id === id)){
    return {
      ok: false,
      error: "Задача с таким id уже существует",
    };
  }

  return{
    ok: true,
    tasks: [...tasks, result.task],
  };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!Number.isSafeInteger(id) || id <= 0){
    return {
      ok: false,
      error: "id должен быть положительным безопасным целым числом",
    };
  }
  if (typeof completed !== "boolean") {
    return {
      ok: false,
      error: "completed должен быть boolean",
    };
  }
  const task = findTaskById(tasks, id);
  if (!task){
    return {
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }
  
  const updatedTask = {
    ...task,
    completed,
  };

  const updatedTasks = tasks.map((task) => task.id === id ? updatedTask : task);
  return {
    ok: true,
    tasks: updatedTasks,
  };
}

export function renameTask(tasks, id, title) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      ok: false,
      error: "id должен быть положительным безопасным целым числом",
    };
  }
  if (typeof title !== "string"){
    return{
      ok: false,
      error: "title должен быть строкой",
    };
  }
  
  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 1 || trimmedTitle.length > 100){
    return{
      ok: false,
      error: "title должен содержать от 1 до 100 символов",
    };
  }

  const task = findTaskById(tasks, id);
  if (!task){
    return{
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }

  const updatedTask = {
    ...task,
    title: trimmedTitle,
  }

  const updatedTasks = tasks.map((task) => task.id === id ? updatedTask : task);
  return{
    ok: true,
    tasks: updatedTasks,
  };
}

export function removeTask(tasks, id) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      ok: false,
      error: "id должен быть положительным безопасным целым числом",
    };
  }

  const task = findTaskById(tasks, id);
  if (!task){
    return{
      ok: false,
      error: "Задача с таким id не найдена",
    };
  }

  const updatedTasks = tasks.filter((task) => task.id !== id);
  return{
    ok: true,
    tasks: updatedTasks,
  };
}