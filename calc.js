const buttons = document.querySelectorAll('button')
const audio = document.querySelector('audio')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const add = document.querySelector('#add')
const subtract = document.querySelector('#subtract')
const multiply = document.querySelector('#multiply')
const divide = document.querySelector('#divide')
const screen = document.querySelector('.screen')
const screen2 = document.querySelector('.screen2')
const equals = document.querySelector('.equals')
const ac = document.querySelector('.ac')
const c = document.querySelector('.c')
const decimal = document.querySelector('#decimal')
const sign = document.querySelector('.negative')

//displays numbers on screen
function display () {
    output = ''
    numbers.forEach (number => {
        number.addEventListener('click', () => {
            output = output.concat(number.getAttribute('id'))
            screen.textContent = output
        })
    })
    operators.forEach (operate => {
        operate.addEventListener('click', () => {
            if (output[output.length-1] == '/' || output[output.length-1] == 'x' || output[output.length-1] == '−' || output[output.length-1] == '+') { return;
            } else {
                output = output.concat(operate.getAttribute('id'))
                screen.textContent = output
            }
        })
    })
    decimal.addEventListener('click', () =>{
        if (output[output.length-1] == '.'){ return;
        } else {
            output = output.concat('.')
            screen.textContent = output
        }
    })
}
display()

// plays the audio when button is pressed
function sound() {
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
}

buttons.forEach(button => {
    button.addEventListener('click', sound)
})

const findOperator = function (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '/' || array[i] == 'x' || array[i] == '−' || array[i] == '+'){
            indx = i
            break;
        } else {
            indx = null
        }
    }
    return indx
}

function operate (num1, num2, operator) {
    
    switch (operator) {
        case "+":
            return num1 + num2
        case "−":
            return num1 - num2
        case "x":
            return num1 * num2
        case "/":
            return num1 / num2
    }
}

function calculate(string) {
    let opCount = 0
    let array = string.split('')

    for (let item of array) {
        if (item == '/' || item == 'x' || item == '−' || item == '+') {
            ++opCount
        }
    }

    for (let i = 0; i < opCount; i++) {
        num1 = array.slice(0, findOperator(array)).join('')
        array.splice(0, findOperator(array))

        operator = array[0]
        array.splice(0, 1)

        if (!findOperator(array)) {
            num2 = array.join('')
        } else {
            num2 = array.slice(0, findOperator(array)).join('')
            array.splice(0, findOperator(array))
        }

        array.unshift(operate(+num1, +num2, operator))
    }
    return (Math.round(array[0] * 100000) / 100000)
}

equals.addEventListener('click', () => {
    screen2.textContent = calculate(output)
    output = ''
})

ac.addEventListener('click', () => { 
    output = '' 
    screen.textContent = output
    screen2.textContent = output
})

c.addEventListener('click', () => {

    screen2.textContent = ''

    let array = output.split('')
    if (output[output.length-1] == '/' || output[output.length-1] == 'x' || output[output.length-1] == '−' || output[output.length-1] == '+') {
         output = array.splice(0, findOperator(array)).join('')
    } else {
        output = array.splice(0, findOperator(array) + 1).join('');
    }
    screen.textContent = output
})

sign.addEventListener ('click', () => {
    if (output[output.length - 1] == '-') {
        output.splice(1, output[output.length])
        screen.tectContent = output
    } else {
        output = output.concat(sign.getAttribute('id'))
        screen.textContent = output
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key < 10) {
        sound()
        output = output.concat(e.key)
        screen.textContent = output

    } else if (e.key == '/' || e.key == 'x' || e.key == '+') {
        if (output[output.length-1] == '/' || output[output.length-1] == 'x' || output[output.length-1] == '+' || output[output.length - 1] == '−') { return;
        } else {
            sound()
            output = output.concat(e.key)
            screen.textContent = output
        }
    } else if (e.key === '-') {
        if (output[output.length-1] == '/' || output[output.length-1] == 'x' || output[output.length-1] == '+' || output[output.length - 1] == '−') { return;
        } else {
        sound()
        output = output.concat('−')
        screen.textContent = output
        }
    } else if (e.key === 'Backspace') {
        sound()
        output = output.slice (0, -1)
        screen.textContent = output
    } else if (e.key === 'Enter') {
        sound()
        screen2.textContent = calculate(output)
        output = ''
    }
 })