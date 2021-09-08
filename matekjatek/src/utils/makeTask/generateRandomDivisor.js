import calculateSolution from '../calculate/calculateSolution';
import getRndInteger from './getRndInteger';
import getAllDivisors from './getAllDivisors';

export default function generateRandomDivisor(task, smallestNumber, largestNumber) {
    const tempTask = JSON.parse(JSON.stringify(task))

    let isPrevOpDivOrMult = false;

    if (tempTask[tempTask.length - 1].operator === '/' || tempTask[tempTask.length - 1].operator === '*') {
        isPrevOpDivOrMult = true;
    }

    let number;

    if (isPrevOpDivOrMult) {
        const tempTaskToCalculate = [];

        for (let i = tempTask.length - 1; i >= 0; i--) {
            if (tempTask[i].operator === '/' || tempTask[i].operator === '*') {
                tempTaskToCalculate.unshift(tempTask[i])
            } else {
                tempTaskToCalculate.unshift(tempTask[i])
                break
            }
        }

        number = calculateSolution(tempTaskToCalculate)
    } else {
        number = tempTask[task.length - 1].number
    }

    const tempDivisorList = getAllDivisors(Math.abs(number));

    if (tempDivisorList.length === 0) {
        let min;
        if (Number(smallestNumber) === 0) {
            min = 1;
        } else {
            min = smallestNumber;
        }
        return getRndInteger(min, largestNumber)
    }

    const divisorList = tempDivisorList.filter(divisor => divisor <= largestNumber);
    const randomIndex = getRndInteger(0, divisorList.length - 1);
    const randomNumber = divisorList[randomIndex];

    return randomNumber;
}