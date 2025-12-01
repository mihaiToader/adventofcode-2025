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
    const dataManager = new DataManager(1, version, "first");
    const data = await dataManager.readData();
    const options: Options = {
        start: 50,
        limit: [0, 99],
    };

    const zeros = findNumberOfZeros(data, options);
    console.log(zeros);
    await dataManager.writeData(zeros);
}

function findNumberOfPassingOverZeros(rotations: Rotations, options: Options) {
    let position = options.start;
    let previousPosition = position;
    let zeros = 0;
    rotations.forEach((rotation) => {
        previousPosition = position;
        position += rotation;

        if (position < options.limit[0]) {
            if (Math.abs(position) > options.limit[1]) {
                zeros += Math.floor(
                    Math.abs(position) / (options.limit[1] + 1),
                );
            }
            if (previousPosition !== 0) {
                zeros += 1;
            }

            position = (options.limit[1] + 1) +
                (position % (options.limit[1] + 1));
            if (position === options.limit[1] + 1) {
                position = options.limit[0];
            }
            return;
        }

        if (position > options.limit[1]) {
            zeros += Math.floor(position / (options.limit[1] + 1));
            position = options.limit[0] + (position % (options.limit[1] + 1));
            return;
        }

        if (position === 0) {
            zeros += 1;
            return;
        }
    });
    return zeros;
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(1, version, "second");
    const data = await dataManager.readData();

    const options: Options = {
        start: 50,
        limit: [0, 99],
    };
    const zeros = findNumberOfPassingOverZeros(data, options);
    console.log(zeros);
    await dataManager.writeData(zeros);
}

export { solveFirst, solveSecond };

// if (import.meta.main) {
//     await solveSecond("0");
// }
