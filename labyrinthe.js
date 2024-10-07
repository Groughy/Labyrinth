// Taille du labyrinthe

const width = 7;
const height = 6;

// Création du labyrinthe

let grid = Array.from({length: height}, ()=> Array(width).fill(0));
const blocked = [
    [1,0], [1,1], [1,2], 
    [1,4], [1,5], [3,1], 
    [3,2], [3,4], [4,1], 
    [4,3], [5,3], [5,5], 
    [6,1]
];

const start = [0,0];
const goal = [4,2];

for (const [x, y] of blocked) {
    grid[y][x] = "|";
}

function printMaze(grid){
    console.log(grid.map(row => row.join('')).join('\n'));
}

printMaze(grid);

function solveLabyrinth(grid, start, goal) {
    // TODO
    let current = start;
    let path = [];
        function checkPath() {
            const [x, y] = current;
            const directions = [
                [1, 0], 
                [0, 1], 
                [-1, 0], 
                [0, -1]
        ];

            for (const [dx, dy] of directions){ // On regarde dans chacune des directions
                const newX = x + dx;
                const newY = y + dy;


                if (newX >= 0 && newX < width && newY >= 0 && newY < height && // Si newX et newY sont dans le labyrinthe
                    grid[newY][newX] !== "|" && !path.some(p => p[0] === newX && p[1] === newY)) { // Si la case n'est pas bloquée ni déjà visitée
                    current = [newX, newY];
                    path.push(current);
                    return true;
                }
            }
        }

        while (JSON.stringify(current) !== JSON.stringify(goal)) {
        if(!checkPath()){
            break;
        }
    }
    return path;
}

const solution = solveLabyrinth(grid, start, goal);
console.log("Chemin à suivre : ", solution);