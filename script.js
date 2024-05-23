document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['London', 'Paris', 'Rome', 'Berlin'],
            answer: 'Paris'
        },
        {
            question: 'Who wrote "Romeo and Juliet"?',
            options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
            answer: 'William Shakespeare'
        },
        {
            question: 'What is the chemical symbol for water?',
            options: ['H2O', 'CO2', 'NaCl', 'O2'],
            answer: 'H2O'
        },
        {
            question: 'What is the largest planet in our solar system?',
            options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
            answer: 'Jupiter'
        },
        {
            question: 'What is the tallest mammal?',
            options: ['Elephant', 'Giraffe', 'Whale', 'Polar Bear'],
            answer: 'Giraffe'
        }
    ];

    const quizForm = document.getElementById('quiz-form');
    const questionsList = document.getElementById('questions-list');
    const scoreDisplay = document.getElementById('score');

    // Load saved progress from session storage
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || [];

    // Display questions
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.textContent = question.question;
        li.appendChild(label);

        question.options.forEach((option, optionIndex) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            if (savedProgress[index] === option) {
                input.checked = true;
            }
            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;
            li.appendChild(input);
            li.appendChild(optionLabel);
        });

        questionsList.appendChild(li);
    });

    // Event listener for form submission
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(quizForm);
        let score = 0;

        // Check answers and calculate score
        formData.forEach((value, index) => {
            if (value === questions[index].answer) {
                score++;
            }
        });

        // Display score
        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;

        // Save score to local storage
        localStorage.setItem('score', score);

        // Clear session storage for progress
        sessionStorage.removeItem('progress');
    });

    // Event listener for radio button change
    questionsList.addEventListener('change', function(event) {
        const radioButton = event.target;
        if (radioButton.tagName === 'INPUT' && radioButton.type === 'radio') {
            const questionIndex = radioButton.name.replace('question', '');
            const selectedOption = radioButton.value;
            const progress = JSON.parse(sessionStorage.getItem('progress')) || [];
            progress[questionIndex] = selectedOption;
            sessionStorage.setItem('progress', JSON.stringify(progress));
        }
    });
});
