import { Command } from "@cliffy/command";

import { initDay } from "./scripts/initDay.ts";

const initialiseDay = new Command()
    .arguments("<day:number>")
    .description("Creates the setup to solve a new day from advent of code")
    .action(async (options: any, day: string) => {
        await initDay(day);
    });

await new Command()
    .name("adv2025")
    .version("0.1.0")
    .description("CLI for advent of code 2025")
    .action(() => {
        console.log("Use --help to get more info!");
    })
    .command("init", initialiseDay)
    .parse(Deno.args);
