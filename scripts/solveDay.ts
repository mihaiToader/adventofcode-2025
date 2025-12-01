import { Command, EnumType } from "@cliffy/command";

enum Problem {
    FIRST = "first",
    SECOND = "second",
}

const problem = new EnumType(Problem);

async function solveDay(day: number, problem: Problem, version: string) {
    const { solveFirst, solveSecond } = await import(
        `../problems/day-${day}/solve.ts`
    );
    if (problem === Problem.FIRST) {
        await solveFirst(version);
    }

    if (problem === Problem.SECOND) {
        await solveSecond(version);
    }
}

const solveDayCommand = new Command()
    .type("problemType", problem)
    .arguments("<day:number> <problem:problemType> <version:string>")
    .description(
        "Runs the code for the given day, with the given input version",
    )
    .action(async (_options: unknown, day: number, problem, version: string) =>
        await solveDay(day, problem, version)
    );

export default solveDayCommand;
