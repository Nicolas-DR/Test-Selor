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
    question: "A : ''Vous n'arrêtez pas de vous plaindre. Si je fais tout cela, c'est pour votre bien.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 1,
  },
  {
    question: "A : ''Je suis désolé B, mais si on prend les petites routes, on n'arrivera jamais à temps à l'aéroport. En plus, si on ouvre les fenêtres, cela va vite devenir une fournaise à l'intérieur de la voiture et vous risquerez d'avoir un malaise, ce que je ne souhaite pas.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 5,
  },
  {
    question: "A : ''Je suis vraiment désolé B, mais si on ne prend pas l'autoroute, vous allez rater votre avion. Je vous promets qu'au retour, on prendra les petites routes.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 3,
  },
  {
    question: "A : ''Je vais baisser un peu la clim. Si vous aviez été prêt quand je suis arrivé, on serait passé par les petites routes. Là, malheureusement, on n'a pas le choix : si vous ne voulez pas rater votre avion, il faut qu'on prenne l'autoroute.''",
    choice1: "- -",
    choice2: "-",
    choice3: "+/-",
    choice4: "+",
    choice5: "+ +",
    answer: 4,
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
