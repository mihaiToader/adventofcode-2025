import IOManager from "../../lib/IOManager.ts";

type InType = number[][];
type OutType = string;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data.split("\n").map((line) =>
            line.split("").map((value) => parseInt(value))
        );
    }

    parseOutputData(data: OutType): string {
        return `${data}`;
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(3, version, "first");
    const data = await dataManager.readData();

    let maximumJoltage = 0;
    data.forEach((battery) => {
        let max;
        for (let i = 0; i < battery.length - 1; i++) {
            for (let j = i + 1; j < battery.length; j++) {
                const joltage = battery[i] * 10 + battery[j];
                if (!max || joltage > max) {
                    max = joltage;
                }
            }
        }
        maximumJoltage += max;
    });
    console.log(maximumJoltage);
    await dataManager.writeData(maximumJoltage);
}


async function solveSecond(version: string) {
    const dataManager = new DataManager(3, version, "second");
    const data = await dataManager.readData();

    let joltage = 0
    data.forEach((battery) => {
        let max = parseInt(battery.slice(0, 12).join(''))
        for (let i= 12; i<battery.length; i++) {
            const maxSequence = `${max}`.split("").map(value => parseInt(value))
            for (let j = 0; j < 12; j++) {
                const newSequence = [...maxSequence.slice(0, j), ...maxSequence.slice(j+1, battery.length), battery[i]]
                const newSequenceJoltage = parseInt(newSequence.join(''))
                if (newSequenceJoltage > max) {
                    max = newSequenceJoltage
                    break
                }
            }
        }
        joltage += max
    })

    console.log(joltage)
}

export { solveFirst, solveSecond };

if (import.meta.main) {
    await solveSecond("0");
}