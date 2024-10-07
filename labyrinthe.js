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
            if (x + 1 < width && grid[y][x + 1] !== "|" && !path.some(p => p[0] === x + 1 && p[1] === y)) { // On regarde à droite
                current = [x + 1, y];
                path.push(current);
            } else if (y + 1 < height && grid[y + 1][x] !== "|" && !path.some(p => p[0] === x && p[1] === y + 1)) { // On  regarde en bas
                current = [x, y + 1];
                path.push(current);
            } else if (x - 1 >= 0 && grid[y][x - 1] !== "|" && !path.some(p => p[0] === x - 1 && p[1] === y)) { // On regarde à gauche
                current = [x - 1, y];
                path.push(current);
            } else if (y - 1 >= 0 && grid[y - 1][x] !== "|" && !path.some(p => p[0] === x && p[1] === y - 1)) { // On regarde en haut
                current = [x, y - 1];
                path.push(current);
            } else { // Sinon, on revient en arrière

                path.pop();
                if (path.length === 0) {
                    console.log("Cul de sac.");
                    return false;
                }
                current = path[path.length - 1];
            }
            return true;
        }
        
        while (JSON.stringify(current) !== JSON.stringify(goal)) {
        if(!checkPath()){
            break;
        }
    }
    return path;
}

const solution = solveLabyrinth(grid, start, goal);
console.log(solution);