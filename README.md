# My Calculator

A simple calculator built using HTML, CSS and JavaScript.

## Features

### Basic Operations

- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)
- Clear the display

### Advanced Operations

- **Percentage (%):** converts the displayed value into a decimal percentage (e.g. `50` becomes `0.5`)
- **Sign Toggle (+/-):** switches the current value between positive and negative
- **Square Root (√):** calculates the square root of the displayed value
- **Square (x²):** squares the displayed value
- **Custom Power (xʸ):** raises a number to any power (e.g. `2`, `xʸ`, `5` gives `32`)

### Error Handling

- Prevents crashes from invalid operations
- Shows clear messages instead of `Infinity` or `NaN`:
  - `Cannot divide by 0` for division by zero (e.g. `10 / 0`)
  - `Invalid input` for operations such as the square root of a negative number
  - `Invalid expression` for incomplete expressions (e.g. `5+`)
  - `Number too large` for results that overflow
- Error messages clear automatically on the next key press

### Other

- Keyboard support
- Light and dark mode toggle

## Keyboard Shortcuts

| Key                            | Action                      |
| ------------------------------ | --------------------------- |
| `0-9`, `+`, `-`, `*`, `/`, `.` | Enter numbers and operators |
| `%`                            | Percentage                  |
| `^`                            | Custom power                |
| `Enter` or `=`                 | Calculate                   |
| `Backspace`                    | Delete last character       |
| `Escape`                       | Clear the display           |

## Technologies Used

- HTML
- CSS
- JavaScript

## How to Run

Open the `index.html` file in a web browser.
