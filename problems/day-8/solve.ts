import IOManager from "../../lib/IOManager.ts";

type Point = {
    x: number;
    y: number;
    z: number;
};
type InType = Point[];
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data.split("\n").map((line) => {
            const [x, y, z] = line.split(",");
            return {
                x: parseInt(x),
                y: parseInt(y),
                z: parseInt(z),
            };
        });
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

function calculateDistance(first: Point, second: Point) {
    return Math.sqrt(
        Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2) +
            Math.pow(first.z - second.z, 2),
    );
}

function createCircuit(
    boxesCircuits: number[][],
    first: number,
    second: number,
) {
    const firstCircuitIndex = boxesCircuits.findIndex((circuit) =>
        circuit.includes(first)
    );
    const secondCircuitIndex = boxesCircuits.findIndex((circuit) =>
        circuit.includes(second)
    );

    const firstCircuit = boxesCircuits[firstCircuitIndex];
    const secondCircuit = boxesCircuits[secondCircuitIndex];

    if (!firstCircuit && !secondCircuit) {
        boxesCircuits.push([first, second]);
        return;
    }

    if (firstCircuit && secondCircuit) {
        // they are in the same circuit
        if (firstCircuit.includes(second) || secondCircuit.includes(first)) {
            return;
        }
        // they are in different
        boxesCircuits[firstCircuitIndex] = [...firstCircuit, ...secondCircuit];
        boxesCircuits.splice(secondCircuitIndex, 1);
    }

    if (firstCircuit) {
        firstCircuit.push(second);
        return;
    }

    if (secondCircuit) {
        secondCircuit.push(first);
        return;
    }
}

const CIRCUITS = 10;

async function solveFirst(version: string) {
    const dataManager = new DataManager(8, version, "first");
    const data = await dataManager.readData();

    const boxesCircuits = [];
    let currentMin = 0;
    for (let circuits = 0; circuits < CIRCUITS; circuits++) {
        let min = Infinity;
        let firstPoint;
        let secondPoint;
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                const distance = calculateDistance(data[i], data[j]);
                if (distance < min && distance > currentMin) {
                    min = distance;
                    firstPoint = i;
                    secondPoint = j;
                }
            }
        }
        if (firstPoint === undefined || secondPoint === undefined) {
            console.log("oh no");
            return;
        }
        createCircuit(boxesCircuits, firstPoint, secondPoint);
        currentMin = min;
    }

    boxesCircuits.sort((c1, c2) => c2.length - c1.length);

    const res = boxesCircuits[0].length * boxesCircuits[1].length *
        boxesCircuits[2].length;
    console.log(res);
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(8, version, "second");
    const data = await dataManager.readData();

    const boxesCircuits = [];
    let currentMin = 0;
    while (true) {
        let min = Infinity;
        let firstPoint;
        let secondPoint;
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                const distance = calculateDistance(data[i], data[j]);
                if (distance < min && distance > currentMin) {
                    min = distance;
                    firstPoint = i;
                    secondPoint = j;
                }
            }
        }
        if (firstPoint === undefined || secondPoint === undefined) {
            console.log("oh no");
            return;
        }
        createCircuit(boxesCircuits, firstPoint, secondPoint);
        currentMin = min;
        if (boxesCircuits[0] && boxesCircuits[0].length == data.length) {
            const first = data[firstPoint];
            const second = data[secondPoint];
            console.log(first.x * second.x);
            break;
        }
    }
}

export { solveFirst, solveSecond };
