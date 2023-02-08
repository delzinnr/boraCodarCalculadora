const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adicionar digito na tela da calculadora
  addDigit(digit) {
    // Checando se a operação já possui ponto.
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processando todas as operações da calculadora
  processOperation(operation) {
    // Checar se o valor atual está vazio.
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        // Mudando operação
        this.changeOperation(operation);
      }
      return;
    }

    // Pegando valor atual e o valor anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "X":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "%":
        operationValue = (previous / 100) * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualsOperator();
        break;

      default:
        break;
    }
  }

  // Mudar valores na tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue == null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Checagem se o valor é zero, se for vamos adicionar o valor atual.
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Mudando operação matematica
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Limpar operação atual
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  // Limpar todas as operações
  processClearOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processar operação
  processEqualsOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
