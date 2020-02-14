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
		default:
			break;
	}
}

const screen = document.querySelector('#screen');
function replaceScreen(display) {
	screen.textContent = `${display}`;
}
let equalsFlag = 0;
let displayValue = '';
function clearEverthing() {
	displayValue = '';
	replaceScreen(displayValue);
	equalsFlag = 0;
}

const numberButtons = Array.from(document.querySelectorAll('.buttons'));
numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (screen.textContent === 'Infinity') {
			clearEverthing();
		}

		try {
			// eslint-disable-next-line no-empty
			if (screen.textContent.includes('.') && button.textContent === '.') {
			} else displayValue += `${button.textContent}`;
			replaceScreen(displayValue);
			equalsFlag = 0;
		} catch (error) {
			displayValue += `${button.textContent}`;
			replaceScreen(displayValue);
			equalsFlag = 0;
		}
	});
});

const clear = document.querySelector('#buttonClear');
clear.addEventListener('click', () => {
	clearEverthing();
	equalsFlag = 1;
});

const backspace = document.querySelector('#buttonDel');
backspace.addEventListener('click', () => {
	screen.textContent = screen.textContent.substring(
		0,
		screen.textContent.length - 1
	);
	displayValue = screen.textContent;
});

const solve = document.querySelector('#buttonEquals');
solve.addEventListener('click', () => {
	// eslint-disable-next-line no-empty
	if (equalsFlag === 1) {
	} else {
		equalsFlag = 1;
		// eslint-disable-next-line no-useless-escape
		const solveArray = displayValue.split(/([^\.0-9]=?)/); // split string just after a non digit or '.'
		for (let i = 0; i < solveArray.length; i += 1) {
			if (solveArray[i] === '*' || solveArray[i] === '/') {
				// solve for multiplication and division only
				solveArray[i - 1] = operate(
					parseFloat(solveArray[i - 1]),
					parseFloat(solveArray[i + 1]),
					solveArray[i]
				);
				solveArray.splice(i, 2);
				i -= 2;
			}
		}
		for (let i = 0; i < solveArray.length; i += 1) {
			if (solveArray[i] === '+' || solveArray[i] === '-') {
				// solve for + and - only
				solveArray[i - 1] = operate(
					parseFloat(solveArray[i - 1]),
					parseFloat(solveArray[i + 1]),
					solveArray[i]
				);
				solveArray.splice(i, 2);
				i -= 2;
			}
		}
		[displayValue] = solveArray;
		displayValue = Math.round(displayValue * 1000) / 1000;
		replaceScreen(displayValue);
	}
});

//test commit line
