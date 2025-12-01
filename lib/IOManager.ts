abstract class IOManager<IN, OUT> {
    readonly day: number;
    readonly version: string;

    constructor(day: number, version: string) {
        this.day = day;
        this.version = version;
    }

    get dataDirectory() {
        return `./problems/day-${this.day}/data`;
    }

    get inputFile() {
        return `${this.dataDirectory}/${this.version}.in`;
    }

    get outputFile() {
        return `${this.dataDirectory}/${this.version}.out`;
    }

    abstract parseInputData(data: string): IN;

    abstract parseOutputData(data: OUT): string;

    async readData(): Promise<IN> {
        return this.parseInputData(await Deno.readTextFile(this.inputFile));
    }

    async writeData(data: OUT) {
        await Deno.writeTextFile(this.outputFile, this.parseOutputData(data));
    }
}

export default IOManager;
