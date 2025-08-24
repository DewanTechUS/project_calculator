/*
 Assignment: (DEWAN MAHMUD)
*/

let display = document.getElementById("display");

let currentInput = "";
let firstNumber = null;
let operator = null;
let resetNext = false;

function updateDisplay(value) {
  display.textContent = value;
}

// Number buttons
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    if (resetNext) {
      currentInput = "";
      resetNext = false;
    }
    currentInput += btn.textContent;
    updateDisplay(currentInput);
  });
});

// Operator buttons
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    if (firstNumber === null) {
      firstNumber = parseFloat(currentInput);
    } else if (operator) {
      firstNumber = operate(operator, firstNumber, parseFloat(currentInput));
      updateDisplay(firstNumber);
    }
    operator = btn.textContent;
    currentInput = "";
  });
});

// Equals
document.getElementById("equals").addEventListener("click", () => {
  if (operator && currentInput !== "") {
    let secondNumber = parseFloat(currentInput);
    let result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    currentInput = "";
    operator = null;
    resetNext = true;
  }
});

// Clear
document.getElementById("clear").addEventListener("click", () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  updateDisplay("0");
});

// Backspace
document.getElementById("backspace").addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
});

// Decimal
document.getElementById("decimal").addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
});

// Math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error: ÷0!" : a / b; }

function operate(operator, a, b) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "×": return multiply(a, b);
    case "÷": return divide(a, b);
    default: return b;
  }
}
