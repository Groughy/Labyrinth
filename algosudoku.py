import time

# Fonction pour afficher la grille
def afficher_grille(grille):
    for ligne in grille:
        print(" ".join(str(val) if val != 0 else '.' for val in ligne))
    print()  # Saut de ligne après chaque grille pour mieux visualiser

# Fonction pour vérifier si un nombre peut être placé dans une position donnée
def est_valide(grille, ligne, col, num):
    # Vérifier la ligne
    for i in range(9):
        if grille[ligne][i] == num:
            return False
    
    # Vérifier la colonne
    for i in range(9):
        if grille[i][col] == num:
            return False
    
    # Vérifier le sous-bloc 3x3
    bloc_ligne = (ligne // 3) * 3
    bloc_col = (col // 3) * 3
    for i in range(3):
        for j in range(3):
            if grille[bloc_ligne + i][bloc_col + j] == num:
                return False
    
    return True

# Fonction pour trouver une case vide (représentée par 0)
def trouver_case_vide(grille):
    for ligne in range(9):
        for col in range(9):
            if grille[ligne][col] == 0:
                return (ligne, col)
    return None

# Algorithme de backtracking pour résoudre le Sudoku avec affichage à chaque étape
def resoudre_sudoku(grille):
    case = trouver_case_vide(grille)
    
    # Si aucune case vide, le Sudoku est résolu
    if not case:
        return True
    
    ligne, col = case
    
    # Essayer les chiffres de 1 à 9
    for num in range(1, 10):
        if est_valide(grille, ligne, col, num):
            # Placer le nombre dans la grille
            grille[ligne][col] = num
            
            # Afficher la grille à chaque étape de remplissage
            print(f"Placer {num} en position ({ligne}, {col}):")
            afficher_grille(grille)
            time.sleep(0.2)  # Pause de 0.2s pour mieux visualiser le processus
            
            # Récurser pour essayer de résoudre le reste de la grille
            if resoudre_sudoku(grille):
                return True
            
            # Si cela ne fonctionne pas, annuler et essayer un autre nombre
            grille[ligne][col] = 0
            
            # Afficher la grille après backtracking
            print(f"Retour en arrière à la position ({ligne}, {col}):")
            afficher_grille(grille)
            time.sleep(0.2)  # Pause pour visualiser le retour en arrière
    
    # Si aucun nombre ne fonctionne, revenir en arrière
    return False

# Exemple de grille à résoudre (0 représente une case vide)
grille_sudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

# Afficher la grille avant de résoudre
print("Grille initiale:")
afficher_grille(grille_sudoku)

# Résoudre la grille
if resoudre_sudoku(grille_sudoku):
    print("\nGrille résolue:")
    afficher_grille(grille_sudoku)
else:
    print("Impossible de résoudre cette grille.")
