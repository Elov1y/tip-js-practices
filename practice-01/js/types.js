"use strict";

console.log("результат: ", "8" + 2);
console.log("тип результата: ", typeof ("8" + 2));

console.log("результат: ", "8" - 2);
console.log("тип результата: ", typeof ("8" - 2));

console.log("результат: ", Number("8") + 2);
console.log("тип результата: ", typeof (Number("8") + 2));

console.log("результат: ", "12" > "3");
console.log("тип результата: ", typeof ("12" > "3"));

console.log("результат: ", 12 === "12");
console.log("тип результата: ", typeof (12 === "12"));

console.log("результат: ", Number(""));
console.log("тип результата: ", typeof Number(""));

console.log("результат: ", Number("text"));
console.log("тип результата: ", typeof Number("text"));

console.log("результат: ", Boolean("false"));
console.log("тип результата: ", typeof Boolean("false"));

console.log("результат: ", typeof null);
console.log("тип результата: ", typeof (typeof null));

console.log("результат: ", typeof NaN);
console.log("тип результата: ", typeof (typeof NaN));