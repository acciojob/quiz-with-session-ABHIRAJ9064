// Do not change code above this line
// This code will just display the questions to the screen

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");
const userAnswers = [];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);

      // Add event listener to save the selected option to session storage
      choiceElement.addEventListener("change", function () {
        const selectedOption = this.value;
        userAnswers[i] = selectedOption;
        saveProgressToSessionStorage();
      });
    }
    questionsElement.appendChild(questionElement);
  }
}

// Save user's progress to session storage
function saveProgressToSessionStorage() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Load user's progress from session storage
function loadProgressFromSessionStorage() {
  const savedProgress = sessionStorage.getItem("progress");
  if (savedProgress) {
    userAnswers.splice(0, userAnswers.length, ...JSON.parse(savedProgress));
  }
}

// Calculate and display the user's score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Display the user's score on the page and store it in local storage
function displayScore() {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Load user's progress and display score on page load
window.addEventListener("load", function () {
  loadProgressFromSessionStorage();
  renderQuestions();
  displayScore();