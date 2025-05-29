const firstNumber = 20
const secondNumber = 40

function bigOfTwo(num1, num2) {
    if(num1 > num2)
        return num1
    else
        return num2
}

const smallOfTwo = (num1, num2) => {
    if(num1 < num2)
        return num1
    else
        return num2
}

module.exports = {firstNumber, secondNumber, bigOfTwo, smallOfTwo}

//export {firstNumber, secondNumber, bigOfTwo, smallOfTwo}