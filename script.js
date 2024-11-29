const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2,
    },
    {
        question: "Which programming language is used for web development?",
        answers: ["Python", "C++", "JavaScript", "Java"],
        correct: 2,
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 2,
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
        correct: 1,
    },
];

let currentQuestionIndex = 0;
let selectedAnswers = [];
let timeLeft = 60;
let timer;

// DOM Elements
const questionContainer = document.getElementById("question-container");
const saveNextButton = document.getElementById("save-next-btn");
const finishButton = document.getElementById("finish-btn");
const timerElement = document.getElementById("timer");
const resultContainer = document.getElementById("result");

// Display a question
function showQuestion(index) {
    const question = questions[index];
    questionContainer.innerHTML = `
        <div class="question">${index + 1}. ${question.question}</div>
        <div class="answers">
            ${question.answers
                .map(
                    (answer, i) => `
                <label class="answer">
                    <input type="radio" name="answer" value="${i}">
                    ${answer}
                </label>`
                )
                .join("")}
        </div>
    `;
}

// Save the selected answer
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    selectedAnswers[currentQuestionIndex] = selectedOption
        ? parseInt(selectedOption.value)
        : null;
}

// Show the next question or finish the quiz
function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        if (currentQuestionIndex === questions.length - 1) {
            saveNextButton.classList.add("hidden");
            finishButton.classList.remove("hidden");
        }
    }
}

// Generate and display the report
function finishQuiz() {
    saveAnswer();
    clearInterval(timer);
    timerElement.classList.add("hidden");
    questionContainer.classList.add("hidden");
    saveNextButton.classList.add("hidden");
    finishButton.classList.add("hidden");

    const report = questions
        .map((q, i) => {
            const userAnswer = selectedAnswers[i];
            const correct = userAnswer === q.correct;
            return `
                <div class="report-item">
                    <div class="question">${i + 1}. ${q.question}</div>
                    ${q.answers
                        .map((answer, idx) => {
                            const className =
                                idx === q.correct
                                    ? "correct option"
                                    : userAnswer === idx
                                    ? "incorrect option"
                                    : "option";
                            return `<div class="${className}">${answer}</div>`;
                        })
                        .join("")}
                </div>
            `;
        })
        .join("");

    resultContainer.innerHTML = `
        <h2>Your Quiz Report</h2>
        ${report}
    `;
    resultContainer.classList.remove("hidden");
}

// Timer logic
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

// Initialize quiz
saveNextButton.addEventListener("click", nextQuestion);
finishButton.addEventListener("click", finishQuiz);
showQuestion(currentQuestionIndex);
startTimer();

// Generate and display the report and score
function finishQuiz() {
    saveAnswer();
    clearInterval(timer);
    timerElement.classList.add("hidden");
    questionContainer.classList.add("hidden");
    saveNextButton.classList.add("hidden");
    finishButton.classList.add("hidden");

    let correctAnswers = 0; // Variable to track the number of correct answers

    const report = questions
        .map((q, i) => {
            const userAnswer = selectedAnswers[i];
            const correct = userAnswer === q.correct;
            if (correct) correctAnswers++; // Increment the score if the answer is correct
            return `
                <div class="report-item">
                    <div class="question">${i + 1}. ${q.question}</div>
                    ${q.answers
                        .map((answer, idx) => {
                            const className =
                                idx === q.correct
                                    ? "correct option"
                                    : userAnswer === idx
                                    ? "incorrect option"
                                    : "option";
                            return `<div class="${className}">${answer}</div>`;
                        })
                        .join("")}
                </div>
            `;
        })
        .join("");

    resultContainer.innerHTML = `
        <h2>Your Quiz Report</h2>
        ${report}
        <h3>Your Score: <span>${correctAnswers} / ${questions.length}</span></h3> <!-- Stylish score -->
    `;
    resultContainer.classList.remove("hidden");
}
