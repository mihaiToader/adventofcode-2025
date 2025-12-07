import IOManager from "../../lib/IOManager.ts";

type InType = string[][];
type OutType = any;

class DataManager extends IOManager<InType, OutType> {
    parseInputData(data: string): InType {
        return data.split("\n").map((line) => line.split(""));
    }

    parseOutputData(data: OutType): string {
        return "";
    }
}

async function solveFirst(version: string) {
    const dataManager = new DataManager(7, version, "first");
    const data = await dataManager.readData();

    const beamsColumns = {};
    for (let column = 0; column < data[0].length; column++) {
        if (data[0][column] === "S") {
            beamsColumns[column] = true;
            break;
        }
    }

    let splits = 0;
    for (let row = 1; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] !== "^") {
                continue;
            }
            if (!beamsColumns[column]) {
                continue;
            }
            splits++;
            beamsColumns[column] = false;
            if (column - 1 >= 0) {
                beamsColumns[column - 1] = true;
            }
            if (column + 1 < data[0].length) {
                beamsColumns[column + 1] = true;
            }
        }
    }
    console.log(splits);
}

async function solveSecond(version: string) {
    const dataManager = new DataManager(7, version, "second");
    const data = await dataManager.readData();

    const beamsColumns = {};
    for (let column = 0; column < data[0].length; column++) {
        if (data[0][column] === "S") {
            beamsColumns[column] = 0;
            break;
        }
    }

    let graph = {};
    const addEdge = (
        graph: Record<number, number[]>,
        parentNode: number,
        node: number,
    ) => {
        if (!graph[parentNode]) {
            graph[parentNode] = [node];
            return graph;
        }
        graph[parentNode].push(node);
        return graph;
    };

    let node = 0;
    for (let row = 1; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] !== "^") {
                continue;
            }
            if (beamsColumns[column] === undefined) {
                continue;
            }
            const parentNode = beamsColumns[column];
            if (column - 1 >= 0) {
                const leftNode = beamsColumns[column - 1];
                if (leftNode) {
                    graph = addEdge(graph, parentNode, leftNode);
                } else {
                    node++;
                    beamsColumns[column - 1] = node;
                    graph = addEdge(graph, parentNode, node);
                }
            }
            if (column + 1 < data[0].length) {
                const rightNode = beamsColumns[column + 1];
                if (rightNode) {
                    graph = addEdge(graph, parentNode, rightNode);
                } else {
                    node++;
                    beamsColumns[column + 1] = node;
                    graph = addEdge(graph, parentNode, node);
                }
            }
            beamsColumns[column] = undefined;
        }
    }

    const visited = Array.from(Array(node + 1)).map(() => 0);
    const source = 0;
    const stack = [];
    stack.push(source);

    const dfs = (graph, visited, node) => {
        if (!graph[node]) {
            return 1;
        }
        let childPaths = 0;
        graph[node].forEach((childNode) => {
            if (visited[childNode]) {
                childPaths += visited[childNode];
                return;
            }
            childPaths += dfs(graph, visited, childNode);
        });
        visited[node] = childPaths;
        return childPaths;
    };

    dfs(graph, visited, 0);
    console.log(visited[0]);
}

export { solveFirst, solveSecond };
