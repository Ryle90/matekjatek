import generateRandomDivisor from './generateRandomDivisor';
import getRndInteger from './getRndInteger';

export default function makeTask(numberOfOperators, smallestNumber, largestNumber, possibleOperators) {
    const numberOfNumbers = Number(numberOfOperators) + 1;

    const task = [];

    function getOperator (operatorName) {
        switch (operatorName) {
            case 'addition':
                return '+'
            case 'subtraction':
                return '-'
            case 'multiplication':
                return '*'
            case 'division':
                return '/'
            default: 
                return ''
        }
    }

    while (task.length < numberOfNumbers) {
        const operatorAndNumber = {};
        let operator;
        let number;

        if (task.length === 0) {
            number = getRndInteger(smallestNumber, largestNumber);
            operator = null;
        } else {
            const indexOfOperation = getRndInteger(0, possibleOperators.length - 1);
            const operatorName = possibleOperators[indexOfOperation];
            operator = getOperator(operatorName)

            if (operator === '/') {
                number = generateRandomDivisor(task, smallestNumber, largestNumber);
            } else {
                number = getRndInteger(smallestNumber, largestNumber);
            }
        }

        operatorAndNumber.operator = operator;
        operatorAndNumber.number = number;
        task.push(operatorAndNumber)
    }

    return task
}