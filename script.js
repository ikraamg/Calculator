function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function mulitply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function power(base, exp) {
	return base ** exp;
}

function factorial(factNo) {
	if (factNo <= 1) {
		return 1;
	}
	return factNo * factorial(factNo - 1);
}

function operate(a, b, operator) {
	switch (operator) {
		case '*':
			return mulitply(a, b);

		case '/':
			return divide(a, b);

		case '+':
			return add(a, b);

		case '-':
			return subtract(a, b);

		case '**':
			return power(a, b);

		case '!':
			return factorial(a);

		default:
			break;
	}
}

let displayValue = '';
const screen = document.querySelector('#screen');
let firstVal = null;
let currentOperator = null;
let secondVal = null;

function updateScreen(display) {
	screen.textContent = `${display}`;
}
function clearEverthing() {
	displayValue = '';
	firstVal = null;
	currentOperator = null;
	secondVal = null;
	screen.textContent = '';
}
const buttons = Array.from(document.querySelectorAll('.buttons'));
buttons.forEach((button) => {
	button.addEventListener('click', () => {
		if (!(button.id === 'buttonEquals')) {
			displayValue += `${button.textContent}`;
		}
		updateScreen(displayValue);

		console.log(button);
		if (button.id === 'buttonClear') {
			clearEverthing();
		}
		if (button.id === 'buttonEquals') {
			const out = operate(Number(firstVal), Number(secondVal), currentOperator);
			clearEverthing();
			updateScreen(out);
		} else if (
			!Number.isNaN(Number(button.textContent) && currentOperator === null)
		) {
			firstVal += firstVal + buttons;
			console.log('TCL: firstVal', firstVal);
		} else if (
			currentOperator === null &&
			Number.isNaN(Number(button.textContent))
		) {
			currentOperator = button.textContent;
			console.log('TCL: currentOperator', currentOperator);
		} else if (
			!Number.isNaN(Number(button.textContent) && currentOperator !== null)
		) {
			secondVal = button.textContent;
			console.log('TCL: secondVal', secondVal);
		}
	});
});
