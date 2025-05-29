// import { firstNum, secondNum, bigOfTwo, smallOfTwo } from "./p1";

const  { firstNumber, secondNumber, bigOfTwo, smallOfTwo }  = require('./p1.js')

console.log(`First Number = ${firstNumber}`)
console.log(`Second Number = ${secondNumber}`)

const num1 = 25
const num2 = 33

console.log(`Biggest between ${num1} and ${num2} is ${bigOfTwo(num1, num2)}`)
console.log(`Smallest between ${num1} and ${num2} is ${smallOfTwo(num1, num2)}`)