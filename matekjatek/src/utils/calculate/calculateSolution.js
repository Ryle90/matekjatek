import safeEval from 'safe-eval';

export default function calculateSolution(task) {
    let stringToCalculate = '';

    task.forEach((operatorAndNumber, index) => {
        if (index === 0) {
            stringToCalculate += ` ${operatorAndNumber.number}`;
        } else {
            stringToCalculate += ` ${operatorAndNumber.operator} ${operatorAndNumber.number}`;
        }
    })

    const solution = safeEval(stringToCalculate)

    return solution
}
