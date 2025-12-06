import IOManager from "../../lib/IOManager.ts";

type InType = any;
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        const ingredientsData = {
            fresh: [],
            ingredients: [],
        };
        data.split("\n").forEach((line) => {
            if (!line) {
                return;
            }
            if (line.includes("-")) {
                const freshInterval = line.split("-");
                ingredientsData.fresh.push([
                    parseInt(freshInterval[0]),
                    parseInt(freshInterval[1]),
                ]);
                return;
            }
            ingredientsData.ingredients.push(parseInt(line));
        });

        return ingredientsData;
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(5, version, "first");
    const data = await dataManager.readData();

    let freshIngredients = 0;
    data.ingredients.forEach((ingredient) => {
        const isFresh = data.fresh.find((interval) =>
            interval[0] <= ingredient && ingredient <= interval[1]
        );
        if (isFresh) {
            freshIngredients += 1;
        }
    });
    console.log(freshIngredients);
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(5, version, "second");
    const data = await dataManager.readData();
    let intervals = data.fresh;
    let changed = true;
    while (changed) {
        changed = false;
        for (let i = 0; i < intervals.length - 1; i++) {
            if (!intervals[i]) {
                continue;
            }
            for (let j = i + 1; j < intervals.length; j++) {
                if (!intervals[j]) {
                    continue;
                }
                const firstInterval = intervals[i];
                const secondInterval = intervals[j];

                if (
                    firstInterval[0] <= secondInterval[0] &&
                    firstInterval[1] >= secondInterval[1]
                ) {
                    intervals[j] = null;
                    changed = true;
                    continue;
                }
                if (
                    secondInterval[0] <= firstInterval[0] &&
                    secondInterval[1] >= firstInterval[1]
                ) {
                    intervals[i] = intervals[j];
                    intervals[j] = null;
                    changed = true;
                    continue;
                }
                if (
                    secondInterval[0] <= firstInterval[0] &&
                    secondInterval[1] >= firstInterval[0] &&
                    secondInterval[1] <= secondInterval[1]
                ) {
                    firstInterval[0] = secondInterval[0];
                    intervals[j] = null;
                    changed = true;
                    continue;
                }
                if (
                    secondInterval[0] >= firstInterval[0] &&
                    secondInterval[0] <= firstInterval[1] &&
                    secondInterval[1] >= firstInterval[1]
                ) {
                    firstInterval[1] = secondInterval[1];
                    intervals[j] = null;
                    changed = true;
                }
            }
        }
    }

    intervals = intervals.filter((interval) => !!interval);
    let sum = 0;
    intervals.forEach((interval) => {
        if (!interval) {
            return;
        }
        sum += interval[1] - interval[0] + 1;
    });
    console.log(sum);
}

export { solveFirst, solveSecond };

if (import.meta.main) {
    await solveSecond("0");
}
