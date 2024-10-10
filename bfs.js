class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function generateRandomMaze(rows, cols) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Add random walls
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (Math.random() < 0.3) { // 30% chance of being a wall
                maze[i][j] = 1;
            }
        }
    }

    // Ensure start and end are not walls
    maze[0][0] = 0;
    maze[rows - 1][cols - 1] = 0;

    return maze;
}

function bfs(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    const queue = new Queue();
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    const paths = []; // To store all paths explored

    queue.enqueue(start);
    visited[start[0]][start[1]] = true;

    while (!queue.isEmpty()) {
        const [x, y] = queue.dequeue();
        paths.push([x, y]); // Record the path

        if (x === end[0] && y === end[1]) {
            // Reconstruct the path
            const path = [];
            let current = end;
            while (current !== null) {
                path.push(current);
                current = parent[current[0]][current[1]];
            }
            return { path: path.reverse(), allPaths: paths };
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited[nx][ny] && maze[nx][ny] === 0) {
                queue.enqueue([nx, ny]);
                visited[nx][ny] = true;
                parent[nx][ny] = [x, y];
            }
        }
    }

    return { path: null, allPaths: paths }; // No path found
}

function printMazeWithPaths(maze, paths, finalPath) {
    const rows = maze.length;
    const cols = maze[0].length;
    const pathsSet = new Set(paths.map(p => `${p[0]},${p[1]}`));
    const finalPathSet = new Set(finalPath.map(p => `${p[0]},${p[1]}`));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (finalPathSet.has(`${i},${j}`)) {
                process.stdout.write('P '); // Mark the final path with 'P'
            } else if (pathsSet.has(`${i},${j}`)) {
                process.stdout.write('X '); // Mark the explored paths with 'X'
            } else {
                process.stdout.write(maze[i][j] === 0 ? '0 ' : '1 ');
            }
        }
        console.log();
    }
}

// Example usage:
const rows = Math.floor(Math.random() * 10) + 5; // Random rows between 5 and 14
const cols = Math.floor(Math.random() * 10) + 5; // Random cols between 5 and 14
const maze = generateRandomMaze(rows, cols);

const start = [0, 0];
const end = [rows - 1, cols - 1];

const result = bfs(maze, start, end);
if (result.path) {
    console.log("Path found:", result.path);
    printMazeWithPaths(maze, result.allPaths, result.path);
} else {
    console.log("No path found.");
    printMazeWithPaths(maze, result.allPaths, []);
}