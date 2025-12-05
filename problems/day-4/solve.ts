import IOManager from "../../lib/IOManager.ts";

type InType = any;
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data.split('\n').map((line) => line.split(""));
    }

    parseOutputData(data: OutType): string {
        return '';
    }
}

function canAccessRoll(map: number[][], row: number, column: number) {
    let accessCount = 0;
    [
        [row - 1, column],
        [row - 1, column - 1],
        [row - 1, column + 1],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column],
        [row + 1, column - 1],
        [row + 1, column + 1],
    ].forEach((coords) => {
        const [x, y] = coords;
        if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
            accessCount += 1;
            return;
        }
        if (map[x][y] === '.') {
            accessCount += 1;
            return;
        }
    })
    return 8 - accessCount < 4
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(4, version, 'first');
    const data = await dataManager.readData();
    // const data = [
    //     [
    //         ".", ".", "@", "@",
    //         ".", "@", "@", "@",
    //         "@", "."
    //     ],
    //     [
    //         "@", "@", "@", ".",
    //         "@", ".", "@", ".",
    //         "@", "@"
    //     ],
    //     [
    //         "@", "@", "@", "@",
    //         "@", ".", "@", ".",
    //         "@", "@"
    //     ],
    //     [
    //         "@", ".", "@", "@",
    //         "@", "@", ".", ".",
    //         "@", "."
    //     ],
    //     [
    //         "@", "@", ".", "@",
    //         "@", "@", "@", ".",
    //         "@", "@"
    //     ],
    //     [
    //         ".", "@", "@", "@",
    //         "@", "@", "@", "@",
    //         ".", "@"
    //     ],
    //     [
    //         ".", "@", ".", "@",
    //         ".", "@", ".", "@",
    //         "@", "@"
    //     ],
    //     [
    //         "@", ".", "@", "@",
    //         "@", ".", "@", "@",
    //         "@", "@"
    //     ],
    //     [
    //         ".", "@", "@", "@",
    //         "@", "@", "@", "@",
    //         "@", "."
    //     ],
    //     [
    //         "@", ".", "@", ".",
    //         "@", "@", "@", ".",
    //         "@", "."
    //     ]
    // ]
    let access = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] !== "@") {
                continue
            }
            if (canAccessRoll(data, i, j)) {
                access += 1
            }
        }
    }
    console.log(access)
    // await dataManager.writeData('out')
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(4, version, 'second');
    const data = await dataManager.readData()
    let removed = 0;
    let access = 0;
    let previousAccess = null;
    while (true) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] !== "@") {
                    continue
                }
                if (canAccessRoll(data, i, j)) {
                    access += 1
                    data[i][j] = '.'
                    removed += 1;
                }
            }
        }
        // console.log(data.map(line => line.join("")).join("\n"))
        // console.log(previousAccess, access)
        if (previousAccess === access) {
            break
        }
        previousAccess = access
    }
    console.log(removed)
    await dataManager.writeData('out')
}

export { solveFirst, solveSecond }

if (import.meta.main) {
    await solveFirst("0");
}