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
    question: "A : ''J'ai déjà vu des gens prendre juste une assiette de légumes. On peut proposer ça. C'est simple, économique et végétarien.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 2,
  },
  {
    question: "A : ''Je veux bien, mais il va falloir que tu me donnes des recettes. Je n'y connais rien à la cuisine végétarienne.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 4,
  },
  {
    question: "A : ''Franchement, ils nous cassent les pieds avec leur lundi vert. Où je vais trouver les recettes ? Je préfère t'avertir tout de suite : si l'entreprise ne me paie pas de formation, ne compte pas sur moi pour les plats végétariens !''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 2,
  },
  {
    question: "A : ''Je vais voir ce qu'il y a comme recettes sur internet. A mon avis, cela ne doit pas être compliqué. Je vais en essayer une ou deux ce week-end à la maison pour voir ce que cela donne. Si tout le monde survit, c'est bon !''",
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
