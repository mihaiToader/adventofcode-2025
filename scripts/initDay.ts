import { ensureDir, ensureFile } from "@std/fs";

export async function initDay(day: number) {
    const directory = `./problems/day-${day}`;
    await ensureDir(directory);
    await ensureFile(`${directory}/README.md`);
    await ensureFile(`${directory}/common.ts`);
    await ensureFile(`${directory}/solve1.ts`);
    await ensureFile(`${directory}/solve2.ts`);

    const dataDirectory = `${directory}/data`;
    await ensureFile(`${dataDirectory}/0.in`);
    await ensureFile(`${dataDirectory}/1.in`);
    await ensureFile(`${dataDirectory}/2.in`);
}
