const displayPreviousValue = document.getElementById('previousValue');
const displayCurrentValue = document.getElementById('currentValue');
const btnNum = document.querySelectorAll('.num');
const btnOperation = document.querySelectorAll('.operation');


let typeOperation = undefined;
let currentValue = '';
let previousValue = '';

const calculadora = {
    add (num1, num2) { return num1 + num2 },
    subtract (num1, num2) { return num1 - num2 },
    division(num1, num2) { return num1 / num2;},
    multiply(num1, num2) { return num1 * num2;}
}

const signos = {
    add: '+',
    subtract: '-', 
    division: '%',
    multiply: 'x',
}

const printValue = () => {
    displayCurrentValue.textContent = currentValue;
    displayPreviousValue.textContent = `${previousValue} ${signos[typeOperation] || ''}`;
}

const agregarNumero = (num) => {
    if(num === '.' && currentValue.includes('.')) return
    currentValue = currentValue.toString() + num.toString();
    printValue();
}

const computar = (type) => {
    typeOperation !== 'igual' && calcular();
    typeOperation = type;
    previousValue = currentValue || previousValue;
    currentValue = '';
    printValue();
}

const calcular = () => {
    previousValue = parseFloat(previousValue);
    currentValue = parseFloat(currentValue);

    if( isNaN(currentValue)  || isNaN(previousValue) ) return
    currentValue = calculadora[typeOperation](previousValue, currentValue);
}

const clearOne = () => {
    currentValue = currentValue.toString().slice(0,-1);
    printValue();
}

const clearAll = () => {
    currentValue = '';
    previousValue = '';
    typeOperation = undefined;
    printValue();
}

btnNum.forEach(boton => boton.addEventListener('click', () => agregarNumero(boton.innerHTML)))

btnOperation.forEach(boton => boton.addEventListener('click', () => computar(boton.value)))

