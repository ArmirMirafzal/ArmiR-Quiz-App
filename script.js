const container = document.querySelector(".container");
const startBtn = document.querySelector(".start-btn");
let nameElm = document.querySelector(".name");

const arr = [];
let result;
let winBoard;
let lostGame;
let laugh;
let question;

// LOGIC FUNCTIONS
startBtn.addEventListener("click", handleStart)

function reloadFunctions() {
  container.style.display = "flex";
  randomNum();
  randOperation();
  nearResult();
  renderGame();
  renderTest();
}

function randomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

function randOperation() {
  const operations = ["+", "-", "*"];
  const randIdx = Math.floor(Math.random() * operations.length);
  return operations[randIdx];
}

function nearResult() {
  return Math.floor(Math.random() * result) + (result - 10);
}

// RENDER FUNCTIONS

function renderGame() {
  [...container.children].forEach((elm) => elm.remove());
  // const nameElm = document.createElement("h1");
  // nameElm.classList.add("name");
  // nameElm.textContent = "QUIZ APP";

  question = document.createElement("div");
  question.classList.add("question");
  const num = document.createElement("div");
  const operation = document.createElement("div");
  const num2 = document.createElement("div");
  const equals = document.createElement("div");

  num.classList.add("num");
  operation.classList.add("operation");
  num2.classList.add("num");
  equals.classList.add("equals");

  equals.textContent = " = ?"
  num.textContent = randomNum();
  num2.textContent = randomNum();
  operation.textContent = randOperation();

  result = eval(
    `${num.textContent}${operation.textContent}${num2.textContent}`
  );

  question.append(num, operation, num2, equals);
  container.append(question);
}

function renderTest() {
  const testElm = document.createElement("div");

  testElm.classList.add("test");

  for (let i = 1; i <= 4; i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn", `btn${i}`);

    testElm.appendChild(btn);
  }
  let idx = Math.floor(Math.random() * testElm.children.length);

  testElm.children[idx].textContent = result;
  testElm.children[idx].classList.add("answer");
  testElm.children[idx].addEventListener("click", () => {
    testElm.children[idx].classList.add("winner");
    for (let elm of testElm.children) {
      elm.style.pointerEvents = "none";
    }
    setTimeout(() => {
      container.style.display = "none";
      winBoard = document.createElement("div");
      winBoard.classList.add("win-game");

      const winElm = document.createElement("h1");
      winElm.classList.add("win");
      winElm.textContent = "Correct answer !!";

      const nextLevelElm = document.createElement("button");
      nextLevelElm.textContent = "Next Question";
      nextLevelElm.classList.add("event");
      nextLevelElm.addEventListener("click", handleNextQuestion);

      winBoard.append(winElm, nextLevelElm);
      document.body.appendChild(winBoard);
    }, 1000);
  });

  console.log(result);
  for (let item of testElm.children) {
    if (!item.classList.contains("answer")) {
      item.textContent = nearResult();
      console.log(item.textContent);

      item.addEventListener("click", () => {
        item.style.backgroundColor = "red";
        testElm.children[idx].classList.add("winner");

        for (let elm of testElm.children) {
          elm.style.pointerEvents = "none";
        }
        setTimeout(() => {
          container.style.display = "none";
          lostGame = document.createElement("div");
          lostGame.classList.add("lose-game");

          const loseElm = document.createElement("h1");
          loseElm.classList.add("lose");
          loseElm.textContent = "Wrong answer !!";

          const resetBtn = document.createElement("button");
          resetBtn.textContent = "Restart Game";
          resetBtn.classList.add("event");
          resetBtn.addEventListener("click", handleResetGame);

          lostGame.append(loseElm, resetBtn);
          document.body.append(lostGame);
        }, 1000);
      });
    }
  }

  container.appendChild(testElm);
}

// HANDLE FUNCTIONS

function handleResetGame() {
  lostGame.style.display = "none";
  reloadFunctions();
}

function handleNextQuestion() {
  winBoard.style.display = "none";
  reloadFunctions();
}

function handleStart(e) {
  setTimeout(() => {
    nameElm.style.display = "flex"
    e.target.remove();
    document.body.style.background= "rgb(97,97,240)";
    reloadFunctions();
  },600)
}