document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                displayValue = '0';
                firstOperand = null;
                waitingForSecondOperand = false;
                operator = null;
            } else if (value === '=') {
                if (firstOperand !== null && operator !== null) {
                    displayValue = String(operate(firstOperand, parseFloat(displayValue), operator));
                    firstOperand = null;
                    operator = null;
                    waitingForSecondOperand = false;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(displayValue);
                } else if (operator) {
                    firstOperand = operate(firstOperand, parseFloat(displayValue), operator);
                }
                operator = value;
                waitingForSecondOperand = true;
                displayValue = `${firstOperand} ${operator}`;
            } else {
                if (waitingForSecondOperand) {
                    displayValue = value;
                    waitingForSecondOperand = false;
                } else {
                    displayValue = displayValue === '0' ? value : displayValue + value;
                }
            }

            display.textContent = displayValue;
        });
    });

    function operate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+': return firstOperand + secondOperand;
            case '-': return firstOperand - secondOperand;
            case '*': return firstOperand * secondOperand;
            case '/': return firstOperand / secondOperand;
            default: return secondOperand;
        }
    }
});
