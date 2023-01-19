const buttons = document.querySelectorAll('button')
const audio = document.querySelector('audio')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const add = document.querySelector('#add')
const subtract = document.querySelector('#subtract')
const multiply = document.querySelector('#multiply')
const divide = document.querySelector('#divide')
const screen = document.querySelector('.screen')
const equals = document.querySelector('.equals')
const ac = document.querySelector('.ac')
const c = document.querySelector('.c')
const decimal = document.querySelector('#decimal')

//displays numbers on screen
function display () {
    output = ''
    numbers.forEach (number => {
        number.addEventListener('click', () =>{
            output = output.concat(number.getAttribute('id'))
            screen.textContent = output
        })
    })
    operators.forEach (operate => {
        operate.addEventListener('click', () =>{
            output = output.concat(operate.getAttribute('id'))
            screen.textContent = output
        })
    })
    decimal.addEventListener('click', () =>{
        output = output.concat('.')
        screen.textContent = output
    })
}
display()

// plays the audio when button is pressed
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    })
})

const findOperator = function (array) {

    for (let i = 0; i < array.length; i++) {
        if (array[i] == '/' || array[i] == 'X' || array[i] == '-' || array[i] == '+'){
            operator = array[i]
            index = i
        }
    }
    return index
}

function operate (equation) {
    let array = equation.split('')
    operator = array[findOperator]

    let num1 = +(array.slice(0, findOperator(array)).join(''))
    let num2 = +(array.slice(findOperator(array) + 1).join(''))

    switch (operator) {
        case "+":
            return num1 + num2
        case "-":
            return num1 - num2
        case "X":
            return num1 * num2
        case "/":
            return num1 / num2
    }
}

equals.addEventListener('click', () => {
    screen.textContent = operate(output)
    output = ''
})

ac.addEventListener('click', () => { 
    output = '' 
    screen.textContent = output
})

c.addEventListener('click', () => {
    let array = output.split('')
    output = array.splice(0, findOperator(array) + 1).join('');
    screen.textContent = output
})