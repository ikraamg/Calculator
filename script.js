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
