import IOManager from "../../lib/IOManager.ts";

type Range = [number, number];
type InType = Range[];

class DataManager extends IOManager<InType, number> {
    parseInputData(data: string): InType {
        const ranges = data.split("\n")[0];
        return ranges.split(",").map((range) => {
            const [start, end] = range.split("-");
            return [parseInt(start), parseInt(end)];
        });
    }

    parseOutputData(data: number): string {
        return `${data}`;
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(2, version, "first");
    const data = await dataManager.readData();
    console.log(data);

    let sum = 0;
    data.forEach((range) => {
        for (let productID = range[0]; productID <= range[1]; productID++) {
            const productIDStr = `${productID}`;
            if (productIDStr.length % 2 !== 0) {
                continue;
            }
            const firstPart = productIDStr.slice(
                0,
                Math.floor(productIDStr.length / 2),
            );
            const secondPart = productIDStr.slice(
                Math.floor(productIDStr.length / 2),
            );
            if (firstPart !== secondPart) {
                continue;
            }
            sum += productID;
        }
    });
    console.log(sum);
}

function isSamePart(productID: string, part: string) {
    let newProductID = productID;
    while (newProductID !== "") {
        const extractedPart = newProductID.slice(0, part.length);
        if (extractedPart !== part) {
            return false;
        }
        newProductID = newProductID.slice(part.length);
    }
    return true;
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(2, version, "second");
    const data = await dataManager.readData();

    let sum = 0;
    data.forEach((range) => {
        for (let productID = range[0]; productID <= range[1]; productID++) {
            const productIDStr = `${productID}`;
            for (
                let slice = Math.floor(productIDStr.length / 2);
                slice > 0;
                slice--
            ) {
                const part = productIDStr.slice(0, slice);
                if (!isSamePart(productIDStr, part)) {
                    continue;
                }
                console.log(productID);
                sum += productID;
                break;
            }
        }
    });
    console.log(sum);
}

if (import.meta.main) {
    console.log(isSamePart("434343", "43"));
}

export { solveFirst, solveSecond };
