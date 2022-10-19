class SuitGame {
  constructor(player, computer) {
    this._player = player;
    this._computer = computer;
  }

  get player() {
    return this._player;
  }

  get computer() {
    return this._computer;
  }

  resultGame() {
    // variabel Player
    const plyBatu = document.querySelector(".player-suit button:nth-child(1)");
    const plyKertas = document.querySelector(".player-suit button:nth-child(2)");
    const plyGunting = document.querySelector(".player-suit button:nth-child(3)");

    // Variabel computer
    const comBatu = document.querySelector(".computer-suit li:nth-child(1)");
    const comKertas = document.querySelector(".computer-suit li:nth-child(2)");
    const comGunting = document.querySelector(".computer-suit li:nth-child(3)");

    let result = "";

    if ((this.player === plyGunting && this.computer === comKertas) || (this.player === plyBatu && this.computer === comGunting) || (this.player === plyKertas && this.computer === comBatu)) {
      return (result = "player wins");
    } else if ((this.player === plyBatu && this.computer === comKertas) || (this.player === plyKertas && this.computer === comGunting) || (this.player === plyGunting && this.computer === comBatu)) {
      return (result = "computer wins");
    } else {
      return (result = "draw");
    }
  }

  score() {
    const score = document.getElementById("score");
    let result = this.resultGame();

    if (result === "player wins") {
      return (score.value = Number(score.value) + 10);
    } else if (result === "computer wins") {
      if (score.value === "0") {
        return (score.value = Number(score.value) + 0);
      } else {
        return (score.value = Number(score.value) - 5);
      }
    } else {
      return (score.value = Number(score.value) + 0);
    }
  }
}

// COMPUTER
// Random computer Choice
const comPart = document.querySelectorAll(".computer-suit li");
function randomComp() {
  let comResult = "";
  for (let i = 0; i < comPart.length; i++) {
    comResult = comPart[Math.floor(Math.random() * comPart.length)];
  }
  return comResult;
}

// PLAYER
// Heart Bar
const heart = document.querySelectorAll(".healthStat i");
function heartBar(countClick) {
  for (let i = 0; i < heart.length; i++) {
    return (heart[countClick - 1].style.color = "black");
  }
}

// Disabled Button
const button = document.getElementsByClassName("ply-button");
function disButton() {
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = true;

    for (let j = 0; j < comPart.length; j++) {
      comPart[j].style.backgroundColor = "#710C04";
    }

    for (let k = 0; k < plyChoice.length; k++) {
      plyChoice[k].style.backgroundColor = "#710C04";
    }
  }
}

// Game Play
const plyChoice = document.querySelectorAll(".player-suit button");
const textResultH3 = document.querySelector(".result h3");
let countClick = 0;
plyChoice.forEach(function (choice) {
  choice.addEventListener("click", function () {
    let player = choice;
    let computer = randomComp();
    let suitGame = new SuitGame(player, computer);
    let result = suitGame.resultGame();
    let score = suitGame.score();
    score;

    if (result === "player wins") {
      // Text Result Part
      textResultH3.innerHTML = "PLAYER 1 WINS";
      textResultH3.style.color = "white";
      textResultH3.style.backgroundColor = "rgb(70, 173, 28)";
      textResultH3.style.transform = "rotate(-20deg)";
      screenResponsive();

      // Computer Part
      computer.style.backgroundColor = "#a5a4a2";

      // Player Part
      player.style.backgroundColor = "#a5a4a2";
    } else if (result === "computer wins") {
      // Heart Bar
      countClick += 1;
      heartBar(countClick);

      if (countClick >= 3) {
        // Text Result
        textResultH3.innerHTML = "GAME OVER";
        document.body.style.backgroundColor = "#710C04";
        textResultH3.style.color = "white";
        textResultH3.style.backgroundColor = "#710C04";
        textResultH3.style.transform = "rotate(0deg)";

        // Disable Button
        disButton();

        // Computer Part
        computer.style.backgroundColor = "#a5a4a2";

        // Player Part
        player.style.backgroundColor = "#a5a4a2";
      } else {
        // Text Result
        textResultH3.innerHTML = "COM WINS";
        textResultH3.style.color = "white";
        textResultH3.style.backgroundColor = "rgb(70, 173, 28)";
        textResultH3.style.transform = "rotate(-20deg)";

        // Computer Part
        computer.style.backgroundColor = "#a5a4a2";

        // Player Part
        player.style.backgroundColor = "#a5a4a2";
      }
      screenResponsive();
    } else {
      textResultH3.innerHTML = "DRAW";
      textResultH3.style.color = "white";
      textResultH3.style.backgroundColor = "rgb(70, 173, 28)";
      textResultH3.style.transform = "rotate(-20deg)";
      screenResponsive();

      // Computer Part
      computer.style.backgroundColor = "#a5a4a2";

      // Player Part
      player.style.backgroundColor = "#a5a4a2";
    }
  });

  choice.addEventListener("mouseout", function () {
    let player = choice;
    let computer = randomComp();

    player.style.backgroundColor = "#9b835f";
    computer.style.backgroundColor = "#9b835f";
  });
});

// RESPONSIVE
function screenResponsive() {
  if (window.screen.width >= 720) {
    textResultH3.style.fontSize = "1rem";
  } else {
    textResultH3.style.fontSize = "5rem";
  }
}

// REFRESH GAME
// const refresh = document.querySelector(".refresh");
// refresh.addEventListener("click", function () {
//   window.location.reload();
// });
