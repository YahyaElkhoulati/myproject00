let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
//Tableau de modèles gagnants
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
//Le joueur « X » joue en premier
let xTurn = true;
let count = 0;

//Disable All Buttons
//Désactiver tous les boutons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  //Activer la fenêtre contextuelle
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
//Activer tous les boutons (pour un nouveau Jeu et un Redémarrage)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  //désactiver le popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
//Cette fonction est exécutée lorsqu'un joueur gagne
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};
//Function for draw
//Fonction pour dessiner
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  };
  
  //New Game
  //Nouveau Jeu
  newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
  });
  
  //Win Logic
  //Gagner logique
  const winChecker = () => {
    //Loop through all win patterns
    //Parcourez tous les modèles de gains
    for (let i of winningPattern) {
      let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
      //Check if elements are filled
      //Vérifiez si les éléments sont remplis
      //If 3 empty elements are same and would give win as would
      //Si 3 éléments vides sont identiques et donneraient la victoire, comme le ferait
      if (element1 != "" && (element2 != "") & (element3 != "")) {
        if (element1 == element2 && element2 == element3) {
          //If all 3 buttons have same values then pass the value to win Function
          //Si les 3 boutons ont les mêmes valeurs, transmettez la valeur pour gagner la fonction
          winFunction(element1);
        }
      }
    }
  };
  
  //Display X/O on click
  //Afficher X/O au clic
  btnRef.forEach((element) => {
    element.addEventListener("click", () => {
      if (xTurn) {
        xTurn = false;
        //Display X
        //Affichage X
        element.innerText = "X";
        element.disabled = true;
      } else {
        xTurn = true;
        //Display Y
        //Affichage Y
        element.innerText = "O";
        element.disabled = true;
      }
      //Increment count on each click
      //Incrémenter le nombre à chaque clic
      count += 1;
      if (count == 9) {
        drawFunction();
      }
      //Check for win on every click
      //Vérifiez la victoire à chaque clic
      winChecker();
    });
  });
  //Enable Buttons and disable popup on page load
  //Activer les boutons et désactiver le popup lors du chargement de la page
  window.onload = enableButtons;  