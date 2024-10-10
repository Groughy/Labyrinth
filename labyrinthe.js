// Taille du labyrinthe

const width = 7;
const height = 6;

let count = 0;
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
    console.log(grid.map(row => row.join(' ')).join('\n'));
}

printMaze(grid);

function solveLabyrinth(grid, start, goal) {
    let visited = Array.from({ length: height }, () => Array(width).fill(false)); // Grille des cases visitées
    // TODO
    let path = [];
    const directions = [
        [1, 0], // On regarde à l'est
        [0, 1], // On regarde au sud
        [-1, 0], // On regarde à l'ouest
        [0, -1] // On regarde au nord
    ];

    function dfs(x, y) {
        // Si on atteint le but, ajouter la position actuelle au chemin et retourner true
        if (x === goal[0] && y === goal[1]) {
            path.push([x, y]);
            return true;
        }

        // Marquer la case actuelle comme visitée
        visited[y][x] = true;
        path.push([x, y]); // Ajouter la position actuelle au chemin

        // Essayer chaque direction
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Vérifier si la nouvelle position est valide (dans les limites, pas un mur, pas encore visitée)
            if (newX >= 0 && newX < width && newY >= 0 && newY < height &&
                grid[newY][newX] !== "|" && !visited[newY][newX]) {

                // Si dfs sur la nouvelle position retourne true, on a trouvé le chemin
                if (dfs(newX, newY)) {
                    count++;
                    return true;
                }
            }
        }

        // Si aucune direction n'est possible, on retire cette position du chemin et on revient en arrière
        path.pop();
        count++;
        return false;
    }

    // Appel initial de la fonction de backtracking depuis le point de départ
    if (dfs(start[0], start[1])) {
        count++;
        return path; // Retourner le chemin si trouvé
    } else {
        return null; // Retourner null si aucun chemin n'a été trouvé
    }
}

const solution = solveLabyrinth(grid, start, goal);
console.log("Chemin à suivre : ", solution);
if (solution) {
    // Marquer le chemin dans la grille avec des numéros croissants
    solution.forEach(([x, y], count) => {
        grid[y][x] = count + 1;
    });
    printMaze(grid);
} else {
    console.log("Aucun chemin trouvé.");
}

console.log("Nombre de cases parcouru : ", count);