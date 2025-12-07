import IOManager from "../../lib/IOManager.ts";

type InType = string[][];
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data.split("\n").map((line) => line.split(""));
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(7, version, "first");
    const data = await dataManager.readData();

    const beamsColumns = {};
    for (let column = 0; column < data[0].length; column++) {
        if (data[0][column] === "S") {
            beamsColumns[column] = true;
            break;
        }
    }

    let splits = 0;
    for (let row = 1; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] !== "^") {
                continue;
            }
            if (!beamsColumns[column]) {
                continue;
            }
            splits++;
            beamsColumns[column] = false;
            if (column - 1 >= 0) {
                beamsColumns[column - 1] = true;
            }
            if (column + 1 < data[0].length) {
                beamsColumns[column + 1] = true;
            }
        }
    }
    console.log(splits);
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(7, version, "second");
    const data = await dataManager.readData();

    console.log(data);
}

export { solveFirst, solveSecond };
