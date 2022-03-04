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
    question: "A : ''Ce n'est pas sûr. C m'a dit qu'il fallait insister. J'essaie encore trois ou quatre fois et si ça ne va pas, je m'occupe du compost.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 4,
  },
  {
    question: "A : ''Oui, il est mort. Tant pis, je vais le ranger et je commencerai ensuite à ramasser les branches.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 2,
  },
  {
    question: "A : ''Oui, ça ne sert à rien d'insister. De toute façon, je suis fatigué. Je vais m'occuper des rosiers. Ça me reposera.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
    choice4: "+",
    choice5: "+ +",
    answer: 1,
  },
  {
    question: "A : ''Essaie. Tu y arriveras peut-être. Sinon, je commencerai à ramasser les branches.''",
    choice1: "- -",
    choice2: "-",
    choice3: "neutre",
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
