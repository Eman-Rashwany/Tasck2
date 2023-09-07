let playerName = document.querySelector("fieldset #name");
let factor = document.querySelector("fieldset #fac");
let numberOfProblems = document.querySelector("fieldset #num");
let operation = document.querySelector("fieldset select");
let start = document.querySelector("fieldset #Start");
let scor = document.querySelector("fieldset #Score");

function createTask (fa, num, op) {
  let div = document.createElement("div");
  let one = document.createElement("span");
  one.setAttribute("data-fac", `${fa}`);

  let two = document.createElement("span");
  let three = document.createElement("span");
  three.setAttribute("data-num", `${num}`);

  let input = document.createElement("input");
  input.setAttribute("type", "number");

  let oneValue = document.createTextNode(fa);
  let twoValue;
  let threeValue = document.createTextNode(num);


  if (op == "Multiply") {
    twoValue = document.createTextNode("x");
    two.setAttribute("data-oper", "x");
  } else {
    twoValue = document.createTextNode("+");
    two.setAttribute("data-oper", "+");
  }

  one.appendChild(oneValue);
  two.appendChild(twoValue);
  three.appendChild(threeValue);
  div.setAttribute("class", `task${num}`);

  div.appendChild(one);
  div.appendChild(two);
  div.appendChild(three);
  div.appendChild(input);
  document.body.appendChild(div)
}


start.addEventListener("click", () => {
  let number = Number(numberOfProblems.value)
  for (let i = 1; i <= number; i++) {
    createTask(factor.value, i, operation.value)
  }
})

scor.addEventListener("click", () => {
  let correctAnswers = 0;
  let totalQuestions = Number(numberOfProblems.value);

  // حساب الإجابات الصحيحة
  for (let i = 1; i <= totalQuestions; i++) {
    let input = document.querySelector(`.task${i} input`);
    if (!input) {
      // التأكد من وجود العنصر input
      continue;
    }

    let answer = Number(input.value);
    let factor = Number(input.previousSibling.getAttribute("data-fac"));
    let operation = input.previousSibling.nextSibling.getAttribute("data-oper");

    let numElement = input.nextSibling;
    if (!numElement) {
      // التأكد من وجود العنصر القادم بعد الـ input
      continue;
    }

    let num = Number(numElement.getAttribute("data-num"));

    if (operation === "x" && answer === factor * num) {
      correctAnswers++;
    } else if (operation === "+" && answer === factor + num) {
      correctAnswers++;
    } else {
      // تغيير لون خلفية الـ <div> الخاطئة إلى الأحمر
      input.parentElement.style.backgroundColor = "red";
    }
  }

  // إعداد نص النتيجة
  let playerNameValue = playerName.value;
  let resultText = `${playerNameValue}, نتيجتك ${correctAnswers}/${totalQuestions}`;
  let div = document.createElement("div");
  let text = document.createTextNode(resultText);
  div.appendChild(text);
  document.body.appendChild(div);
});

