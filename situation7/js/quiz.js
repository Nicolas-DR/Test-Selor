const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];




let questions = [
  {
    question: "B : ''Il doit probablement encore être en train de jouer sur son téléphone près de la photocopieuse.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 1,
  },
  {
    question: "B : ''Il est parti dans la salle de reprographie il y a un quart d'heure. Je pense qu'il doit encore s'y trouver.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 2,
  },
  {
    question: "B : ''Il est occupé toute la matinée avec D. Si tu veux, je lui dis d'aller te voir dès qu'il est de retour.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 5,
  },
  {
    question: "B : ''Malheureusement, je ne pense pas qu'il va pouvoir t'aider ce matin. Il est occupé avec D. Si tu veux, on peut aller la bouger ensemble.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 5,
  },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "vrai" : "faux";

    if (classToApply === "vrai") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
