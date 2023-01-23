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
const sign = document.querySelector('.negative')

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
            if (output[output.length-1] == '/' || output[output.length-1] == 'X' || output[output.length-1] == '-' || output[output.length-1] == '+') { return;
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
        case "-":
            return num1 - num2
        case "X":
            return num1 * num2
        case "/":
            return num1 / num2
    }
}

function calculate(array) {
    let opCount = 0
    console.log(array)

    for (let item of array) {
        if (item == '/' || item == 'X' || item == '-' || item == '+') {
            ++opCount
        }
    }

    for (let i = 0; i < opCount; i++) {
        num1 = array.slice(0, findOperator(array)).join('')
        array.splice(0, findOperator(array))

        operator = array[0]
        array.splice(0, 1)
        console.log(array)

        if (!findOperator(array)) {
            num2 = array.join('')
        } else {
            num2 = array.slice(0, findOperator(array)).join('')
            array.splice(0, findOperator(array))
        }

        console.log('1='+num1,'2='+ num2, operator)
        array.unshift(operate(+num1, +num2, operator))
        console.log(array)
    }
    return array[0]
}

equals.addEventListener('click', () => {
    let array = output.split('')
    screen.textContent = calculate(array)
    output = ''
})

ac.addEventListener('click', () => { 
    output = '' 
    screen.textContent = output
})

c.addEventListener('click', () => {
    let array = output.split('')
    if (output[output.length-1] == '/' || output[output.length-1] == 'X' || output[output.length-1] == '-' || output[output.length-1] == '+') {
         output = array.splice(0, findOperator(array)).join('')
    } else {
        output = array.splice(0, findOperator(array) + 1).join('');
    }
    screen.textContent = output
})
