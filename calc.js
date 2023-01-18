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

function operate (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '/' || array[i] == 'X' || array[i] == '-' || array[i] == '+'){
            operator = array[i]
            index = i
        }
    }

    let num1 = +(array.slice(0, index).join(''))
    let num2 = +(array.slice(index + 1).join(''))

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
    let equation = output.split('')
    screen.textContent = operate(equation)
    output = ''
})
