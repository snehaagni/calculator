let display = document.getElementById("display");
let isError = false;

/* ---------- Error helpers ---------- */

function showError(message) {
    display.value = message;
    isError = true;
    display.classList.add("error");
}

function clearError() {
    isError = false;
    display.classList.remove("error");
}

// If an error is showing, clear it and return true so the caller can stop.
function handleError() {
    if (isError) {
        clearDisplay();
        return true;
    }
    return false;
}

/* ---------- Basic functions ---------- */

function addValue(value) {
    if (isError) {
        clearDisplay();   // the key press clears the error, then continues
    }
    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    clearError();
    display.value = "0";
}

/* ---------- Evaluation ---------- */

// Returns a finite number, or null (after showing an error message).
function evaluateExpression() {
    let result;

    try {
        result = Function(
            '"use strict"; return (' + display.value + ')'
        )();
    } catch {
        showError("Invalid expression");
        return null;
    }

    if (!isFinite(result)) {
        // 10/0 gives Infinity, 0/0 gives NaN
        if (display.value.includes("/")) {
            showError("Cannot divide by 0");
        } else if (Number.isNaN(result)) {
            showError("Invalid input");
        } else {
            showError("Number too large");
        }
        return null;
    }

    return result;
}

// Shows a result, catching overflow (e.g. a huge square).
function showResult(result) {
    if (!isFinite(result)) {
        showError("Number too large");
        return;
    }
    // toFixed avoids float noise like 0.30000000000000004
    display.value = parseFloat(result.toFixed(10));
}

function calculate() {
    if (handleError()) return;

    const result = evaluateExpression();
    if (result !== null) {
        showResult(result);
    }
}

/* ---------- Extra functions ---------- */

function percentage() {
    if (handleError()) return;
    const value = evaluateExpression();
    if (value !== null) showResult(value / 100);
}

function toggleSign() {
    if (handleError()) return;
    const value = evaluateExpression();
    if (value !== null) showResult(value * -1);
}

function squareRoot() {
    if (handleError()) return;
    const value = evaluateExpression();
    if (value === null) return;

    if (value < 0) {
        showError("Invalid input");
    } else {
        showResult(Math.sqrt(value));
    }
}

function square() {
    if (handleError()) return;
    const value = evaluateExpression();
    if (value !== null) showResult(Math.pow(value, 2));
}

function powerOf() {
    if (handleError()) return;
    // Brackets avoid JS errors such as -2**2
    display.value = "(" + display.value + ")**";
}

/* ---------- Keyboard support ---------- */

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if ("0123456789+-*/.".includes(key)) {
        addValue(key);
    } else if (key === "%") {
        percentage();
    } else if (key === "^") {
        powerOf();
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        if (isError) {
            clearDisplay();
        } else {
            display.value = display.value.slice(0, -1) || "0";
        }
    }
});

/* ---------- Theme toggle ---------- */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Switch to Light Mode";
    } else {
        themeToggle.textContent = "Switch to Dark Mode";
    }
});