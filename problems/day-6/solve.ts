import IOManager from "../../lib/IOManager.ts";

type InType = {
    values: number[][];
    operators: string[];
};
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        const problem = data.split("\n").map((line) =>
            line.split(" ").filter((value) => !!value)
        );
        return {
            values: problem.splice(0, problem.length - 1).map((line) =>
                line.map((value) => parseInt(value))
            ),
            operators: problem[problem.length - 1],
        };
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

function solveProblem(data: InType) {
    let grandTotal = 0;
    for (let column = 0; column < data.values[0].length; column++) {
        let total = data.values[0][column];
        for (let row = 1; row < data.values.length; row++) {
            if (data.operators[column] === "+") {
                total += data.values[row][column];
                continue;
            }
            if (data.operators[column] === "*") {
                total *= data.values[row][column];
            }
        }
        grandTotal += total;
    }
    return grandTotal;
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(6, version, "first");
    const data = await dataManager.readData();

    const grandTotal = solveProblem(data);
    console.log(grandTotal);
}

type SecondInType = {
    values: string[];
    operators: string[];
};

class SecondDataManager extends IOManager<SecondInType, OutType> {
    parseInputData(data: string): SecondInType {
        let problem = data.split("\n");
        const operators = problem[problem.length - 1];
        problem = problem.splice(0, problem.length - 1);

        return {
            values: problem.map((line) => " " + line),
            operators: operators.split(" ").filter((operator) => !!operator),
        };
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

async function solveSecond(version: string) {
    const dataManager = new SecondDataManager(6, version, "second");
    const data = await dataManager.readData();
    console.log(data);

    let grandTotal = 0;
    let total = null;
    let indexOperator = data.operators.length - 1;
    for (let column = data.values[0].length - 1; column >= 0; column--) {
        let strNumber = "";
        for (let row = 0; row < data.values.length; row++) {
            strNumber += data.values[row][column];
        }
        const number = parseInt(strNumber);
        if (isNaN(number)) {
            grandTotal += total;
            total = null;
            indexOperator--;
            continue;
        }
        if (total === null) {
            total = number;
            continue;
        }
        const operator = data.operators[indexOperator];
        if (operator === "+") {
            total += number;
            continue;
        }
        if (operator === "*") {
            total *= number;
        }
    }
    console.log(grandTotal);
}

export { solveFirst, solveSecond };
