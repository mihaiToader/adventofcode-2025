import { Command } from "@cliffy/command";

import { initDay, solveDay } from "./scripts/index.ts";

await new Command()
    .name("adv2025")
    .version("0.1.0")
    .description("CLI for advent of code 2025")
    .action(() => {
        console.log("Use --help to get more info!");
    })
    .command("init", initDay)
    .command("solve", solveDay)
    .parse(Deno.args);
