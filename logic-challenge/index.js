/**
 * Se multiplica el valor por 1 para hacer el casteo a número y mantener la consistencia del mismo.
 */
const operators = {
    '+': (firstNumber, secondNumber) => (firstNumber * 1) + (secondNumber * 1),
    '-': (firstNumber, secondNumber) => (firstNumber * 1) - (secondNumber * 1),
    '/': (firstNumber, secondNumber) => (firstNumber * 1) / (secondNumber * 1),
    '*': (firstNumber, secondNumber) => (firstNumber * 1) * (secondNumber * 1),
    '^': (firstNumber, secondNumber) => Math.pow((firstNumber * 1), (secondNumber * 1))
};

const operationOrders = [
    [
        ['/'],
        ['*'],
        ['^']
    ],
    [
        ['+'],
        ['-'],
    ]
];

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const maxAllowed = (str) => {
    if (str.length > 20) {
        throw Error('Max length allowed is 20');
    }

    return str;
};

const cleaning = (str) => str.replace(/[^0-9%^*\/()\-+.]/g, '');
const executing = (str) => {
    for (let index = 0; index < operationOrders.length; index++) {
        const element = operationOrders[index];
        let re = new RegExp('(\\d+\\.?\\d*)([\\' + element.join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0;

        while (re.test(str)) {
            const operator = RegExp.$2;
            const firstValue = RegExp.$1;
            const secondValue = RegExp.$3
            let result = operators[operator](firstValue, secondValue);
            if (isNaN(result) || !isFinite(result)) throw Error('Unexpected result');
            str = str.replace(re, result)
        }
    }
    return str < 0 ? str * -1 : str * 1;
}

const main = (str) => pipe(
    maxAllowed,
    cleaning,
    executing
)(str);


module.exports = { main };