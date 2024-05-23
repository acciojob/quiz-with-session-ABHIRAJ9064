document.addEventListener("DOMContentLoaded", function() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Saturn", "Jupiter"],
      correctAnswer: "Jupiter"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correctAnswer: "H2O"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "India", "South Korea"],
      correctAnswer: "Japan"
    }
  ];

  const quizForm = document.getElementById("quiz-form");
  const questionsList = document.getElementById("questions-list");
  const scoreDisplay = document.getElementById("score-display");

  function populateQuestions() {
    questions.forEach((q, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${q.question}</strong>
        <ul>
          ${q.options.map(option => `
            <li>
              <label>
                <input type="radio" name="question${index}" value="${option}" ${getOptionStatus(index, option)}>
                ${option}
              </label>
            </li>
          `).join('')}
        </ul>
      `;
      questionsList.appendChild(listItem);
    });
  }

  function getOptionStatus(questionIndex, option) {
    const progress = JSON.parse(sessionStorage.getItem("progress"));
    if (progress && progress[questionIndex] === option) {
      return "checked";
    }
    return "";
  }

  function updateProgress() {
    const progress = {};
    quizForm.querySelectorAll('input[type="radio"]:checked').forEach(input => {
      const questionIndex = input.name.replace("question", "");
      progress[questionIndex] = input.value;
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
  }

  function calculateScore() {
    const progress = JSON.parse(sessionStorage.getItem("progress"));
    let score = 0;
    questions.forEach((q, index) => {
      if (progress && progress[index] === q.correctAnswer) {
        score++;
      }
    });
    localStorage.setItem("score", score);
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  }

  quizForm.addEventListener("change", updateProgress);
  quizForm.addEventListener("submit", function(event) {
    event.preventDefault();
    calculateScore();
  });

  populateQuestions();
});
