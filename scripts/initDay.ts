import { Command } from "@cliffy/command";
import { ensureDir, ensureFile, exists } from "@std/fs";

async function writeSolveFunctions(day: number) {
    const filePath = `./problems/day-${day}/solve.ts`;

    await Deno.writeTextFile(
        filePath,
        `import IOManager from "../../lib/IOManager.ts";

type InType = any;
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data;
    }

    parseOutputData(data: OutType): string {
        return '';
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(1, version);
    const data = await dataManager.readData();

    await dataManager.writeData('out')
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(1, version);
    const data = await dataManager.readData()

    await dataManager.writeData('out')
}

export { solveFirst, solveSecond }
`,
    );
}

async function writeReadme(day: number) {
    const filePath = `./problems/day-${day}/README.md`;

    await Deno.writeTextFile(
        filePath,
        `# [Day ${day}](https://adventofcode.com/2025/day/${day})`,
    );
}

async function initDay(day: number) {
    const directory = `./problems/day-${day}`;
    await ensureDir(directory);

    if (!await exists(`${directory}/solve.ts`)) {
        await ensureFile(`${directory}/solve.ts`);
        await writeSolveFunctions(day);
    }
    if (!await exists(`${directory}/README.md`)) {
        await ensureFile(`${directory}/README.md`);
        await writeReadme(day);
    }

    const dataDirectory = `${directory}/data`;
    await ensureFile(`${dataDirectory}/0.in`);
    await ensureFile(`${dataDirectory}/1.in`);
    await ensureFile(`${dataDirectory}/2.in`);
}

const initialiseDayCommand = new Command()
    .arguments("<day:number>")
    .description("Creates the setup to solve a new day from advent of code")
    .action(async (_options: unknown, day: number) => await initDay(day));

export default initialiseDayCommand;
