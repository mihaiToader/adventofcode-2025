import IOManager from "../../lib/IOManager.ts";

type Rotations = number[];

type Options = {
    start: number;
    limit: [number, number];
};

class DataManager extends IOManager<Rotations, number> {
    parseInputData(data: string): Rotations {
        return data.split("\n").map((line) => {
            if (line.includes("L")) {
                return -parseInt(line.replace("L", ""));
            }
            if (line.includes("R")) {
                return parseInt(line.replace("R", ""));
            }
            return null;
        }).filter((value) => value !== null);
    }

    parseOutputData(data: number): string {
        return `${data}`;
    }
}

function findNumberOfZeros(rotations: Rotations, options: Options) {
    let position = options.start;
    let zeros = 0;
    rotations.forEach((rotation) => {
        position += rotation;
        if (position < options.limit[0]) {
            position = (options.limit[1] + 1) +
                (position % (options.limit[1] + 1));
        }
        if (position > options.limit[1]) {
            position = options.limit[0] + (position % (options.limit[1] + 1));
        }
        if (position === 0) {
            zeros++;
        }
    });
    return zeros;
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(1, version);
    const data = await dataManager.readData();
    const options: Options = {
        start: 50,
        limit: [0, 99],
    };

    const zeros = findNumberOfZeros(data, options);
    console.log(zeros);
    await dataManager.writeData(zeros);
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(1, version);
    const data = await dataManager.readData();

    await dataManager.writeData(data);
}

export { solveFirst, solveSecond };
