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
		try {
			// eslint-disable-next-line no-empty
			if (displayValue.includes('.') && button.textContent === '.') {
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

const solve = document.querySelector('#buttonEquals');
solve.addEventListener('click', () => {
	// console.log(displayValue);
	if (equalsFlag === 1) {
		displayValue = '';
		replaceScreen(displayValue);
	} else {
		equalsFlag = 1;
		// eslint-disable-next-line no-useless-escape
		const solveArray = displayValue.split(/([^\.0-9]=?)/);
		// console.log('TCL: solveArray', solveArray);
		for (let i = 0; i < solveArray.length; i += 1) {
			// if (Number.isNaN(Number(solveArray[i]))) {
			if (solveArray[i] === '*' || solveArray[i] === '/') {
				// console.log('TCL: currentNo', solveArray[i]);
				solveArray[i - 1] = operate(
					parseFloat(solveArray[i - 1]),
					parseFloat(solveArray[i + 1]),
					solveArray[i]
				); // operating on previous and next value
				solveArray.splice(i, 2);
				// console.log('TCL: solveArray', solveArray);
				i -= 2;
			}
		}

		for (let i = 0; i < solveArray.length; i += 1) {
			// if (Number.isNaN(Number(solveArray[i]))) {
			if (solveArray[i] === '+' || solveArray[i] === '-') {
				// console.log('TCL: currentNo', solveArray[i]);
				solveArray[i - 1] = operate(
					parseFloat(solveArray[i - 1]),
					parseFloat(solveArray[i + 1]),
					solveArray[i]
				); // operating on previous and next value
				solveArray.splice(i, 2);
				// console.log('TCL: solveArray', solveArray);
				i -= 2;
			}
		}
		[displayValue] = solveArray;
		displayValue = Math.round(displayValue * 10) / 10;
		replaceScreen(displayValue);
	}
});
