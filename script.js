let displayValue = "0";
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
  const display = document.querySelector("#display");
  display.innerText = displayValue;
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  waitingForSecondOperand = false;
  operator = null;
  updateDisplay();
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);
    displayValue = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  updateDisplay();
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand,
};

function calculateResult() {
  if (operator === null) return;
  inputOperator(operator);
  operator = null;
}

function toggleSign() {
  displayValue =
    displayValue.charAt(0) === "-" ? displayValue.slice(1) : "-" + displayValue;
  updateDisplay();
}

function percentage() {
  const value = parseFloat(displayValue);
  displayValue = String(value / 100);
  updateDisplay();
}

function inputDecimal(dot) {
  if (waitingForSecondOperand) {
    displayValue = "0.";
    waitingForSecondOperand = false;
    return;
  }

  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
  updateDisplay();
}

// Manipulador de teclado
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputDigit(key);
  } else if (key === ".") {
    inputDecimal(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace" || key === "Escape") {
    clearDisplay();
  } else if (key === "%") {
    percentage();
  } else if (key === "+/-") {
    toggleSign();
  } else {
    switch (key) {
      case "+":
        inputOperator("+");
        break;
      case "-":
        inputOperator("-");
        break;
      case "*":
      case "x":
      case "X":
        inputOperator("*");
        break;
      case "/":
        inputOperator("/");
        break;
    }
  }
});
