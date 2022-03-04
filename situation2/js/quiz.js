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
    question: "C : ''Oui, tu as raison. Il a peut-être des problèmes. Je pense qu'on devrait en parler au responsable.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 2,
  },
  {
    question: "C : ''Ecoute, ce n'est pas très grave. Il est comme ça. On ne va pas le changer. Au moins, le travail est bien fait. Après tout, c'est ce qui compte, non ?''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 4,
  },
  {
    question: "C : ''On pourrait peut-lui proposer de prendre un verre avec nous après le travail ? Cela pourrait être sympa. Qu'en penses-tu ?''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 5,
  },
  {
    question: "C : ''Il faut lui laisser le temps de s'habituer. Je pense que dans quelques semaines, cela ira mieux.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 3,
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
