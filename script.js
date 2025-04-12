// Quiz configuration
const API_KEY = "FJr5q7z5RxceCVLVHTGBdnk89dqrdaaixAU0tDba";

// Fallback Questions (in case API fails or rate-limits)
const customQuestions = {
    easy: [
        {
            question: "What is 2+2?",
            answers: { answer_a: "3", answer_b: "4", answer_c: "5" },
            correct_answers: { answer_b_correct: "true" }
        },
        {
            question: "What is the capital of France?",
            answers: { answer_a: "London", answer_b: "Paris", answer_c: "Berlin" },
            correct_answers: { answer_b_correct: "true" }
        }
    ],
    medium: [
        {
            question: "What does HTML stand for?",
            answers: {
                answer_a: "Hyper Text Markup Language",
                answer_b: "Home Tool Markup Language",
                answer_c: "Hyperlinks and Text Markup Language"
            },
            correct_answers: { answer_a_correct: "true" }
        }
    ],
    hard: [
        {
            question: "What is the chemical symbol for gold?",
            answers: { answer_a: "Ag", answer_b: "Au", answer_c: "Fe" },
            correct_answers: { answer_b_correct: "true" }
        }
    ]
};

let currentDifficulty = 'easy';
let currentQuestion = null;
let score = { correct: 0, incorrect: 0 };
let selectedAnswers = [];


// DOM Elements
const difficultySelect = document.getElementById('difficulty');
const getQuestionBtn = document.querySelector('.difficulty-container .btn');
const questionSection = document.getElementById('question-section');
const questionText = document.getElementById('question');
const answerButtons = document.querySelector('.answer-buttons');
const feedbackSection = document.querySelector('.feedback');
const feedbackText = feedbackSection.querySelector('p');
const newDifficultySelect = document.getElementById('new-difficulty');
const nextBtn = document.querySelector('.next');
const finishBtn = document.querySelector('.finish');
const scoreboardSection = document.querySelector('.scoreboard');
const correctScoreElement = document.getElementById('correct-score');
const incorrectScoreElement = document.getElementById('incorrect-score');
const resetBtn = document.querySelector('.reset');


// Initialize the app
function init() {
     // Load scores from localStorage
     const savedScore = localStorage.getItem('quizScore');
     if (savedScore) {
         score = JSON.parse(savedScore);
         updateScoreboard();
     }


    // Set up event listeners
    difficultySelect.addEventListener('change', (e) => {
        currentDifficulty = e.target.value;
    });
    
    getQuestionBtn.addEventListener('click', fetchQuestion);
    
    nextBtn.addEventListener('click', () => {
        // Update difficulty if changed in feedback
        currentDifficulty = newDifficultySelect.value;
        fetchQuestion();
    });
    
    finishBtn.addEventListener('click', showScoreboard);
    
    resetBtn.addEventListener('click', resetScores);
    
    // Hide sections that should start hidden
    questionSection.style.display = 'none';
    feedbackSection.style.display = 'none';
    scoreboardSection.style.display = 'none';
}

// Fetch question from QuizAPI with fallback
async function fetchQuestion() {
    try {
        // Show loading state
        questionText.textContent = 'Loading question...';
        answerButtons.innerHTML = '';
        
        // Show question section
        questionSection.style.display = 'block';
        feedbackSection.style.display = 'none';
        
        const response = await fetch(
            `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&difficulty=${currentDifficulty}&limit=1`
        );
        
        if (!response.ok) {
            throw new Error(' API Failed');
        }
        
        const data = await response.json();
        currentQuestion = data[0] 

         // If API returns empty, use fallback questions
        if (!currentQuestion) throw new Error('No  API questions');
        displayQuestion(currentQuestion);
    } catch (error) {
        console.log('Using fallback questions');
        const localQuestions = customQuestions[currentDifficulty];
        currentQuestion = localQuestions[Math.floor(Math.random() * localQuestions.length)];
        displayQuestion(currentQuestion);
    }
}

// Display the question and answers
function displayQuestion(question) {
    questionText.textContent = question.question;
    answerButtons.innerHTML = '';
    selectedAnswers = [];
    
    // Get all possible answers (filter out null values)
    const answers = Object.entries(question.answers)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => ({ letter: key.replace('answer_', '').toUpperCase(), // Changes "answer_a" to "A"
            text: value 
        }));
    
    // Get correct answers (multiple possible)
    const correctAnswers = Object.entries(question.correct_answers)
        .filter(([_, value]) => value === 'true')
        .map(([key]) => key.replace('_correct', '').replace('answer_', '').toUpperCase());
        
    // Determine if multiple answers are allowed
    const isMultipleChoice = countCorrectAnswers(question) > 1;


    // Create answer buttons
    answers.forEach(answer => {
        const isCorrect = correctAnswers.includes(answer.letter);
        
        const label = document.createElement('label');
        label.className = 'btn';
        
        const input = document.createElement('input');
        input.type = isMultipleChoice ? 'checkbox' : 'radio'; // Dynamic input type
        input.name = 'answer';
        input.dataset.letter = answer.letter;
        input.dataset.correct = isCorrect;
        
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (!isMultipleChoice) {
                    // Clear previous selection for radio buttons
                    selectedAnswers = [];
                    // Uncheck other radio buttons
                    document.querySelectorAll('input[name="answer"]').forEach(otherInput => {
                        if (otherInput !== e.target) otherInput.checked = false;
                    });
                }
                selectedAnswers.push({
                    letter: answer.letter,
                    text: answer.text,
                    correct: isCorrect
                });
            } else {
                selectedAnswers = selectedAnswers.filter(a => a.letter !== answer.letter);
            }
        });

        
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${answer.letter}. ${answer.text}`));
        
        answerButtons.appendChild(label);
    });
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn submit-btn'
    submitBtn.textContent = 'Submit Answers';
    submitBtn.addEventListener('click', checkAnswers);
    answerButtons.appendChild(submitBtn);
}

// Check selected answers against correct answers
function checkAnswers() {
    if (selectedAnswers.length === 0) {
        alert('Please select at least one answer');
        return;
    }
    
    // Show feedback section
    feedbackSection.style.display = 'block';
    
    // Check if all selected answers are correct and all correct answers are selected
    const allCorrect = selectedAnswers.every(answer => answer.correct) && 
                      selectedAnswers.length === countCorrectAnswers(currentQuestion);
    
    if (allCorrect) {
        feedbackText.innerHTML = '✅ <strong>Correct!</strong>';
        score.correct++;
    } else {
        feedbackText.innerHTML = '❌ <strong>Incorrect!</strong>';
        score.incorrect++;
        
        // Show correct answers
        const correctAnswers = Object.entries(currentQuestion.correct_answers)
            .filter(([_, value]) => value === 'true')
            .map(([key]) => {
                const answerKey = key.replace('_correct', '').toUpperCase();
                return `${answerKey}. ${currentQuestion.answers[answerKey.toLowerCase()]}`;
            });
            
        feedbackText.innerHTML += `<br>The correct answer(s): ${correctAnswers.join(', ')}`;
    }
    
    // Update score display
    updateScoreboard();
}

// Helper function to count correct answers
function countCorrectAnswers(question) {
    return Object.values(question.correct_answers)
        .filter(value => value === 'true')
        .length;
}

// Update scoreboard display
function updateScoreboard() {
       // Save to localStorage
       localStorage.setItem('quizScore', JSON.stringify(score));
       correctScoreElement.textContent = score.correct;
       incorrectScoreElement.textContent = score.incorrect;
   }
   
// Show scoreboard section
function showScoreboard() {
    questionSection.style.display = 'none';
    feedbackSection.style.display = 'none';
    scoreboardSection.style.display = 'block';
    updateScoreboard();
}

// Reset scores
function resetScores() {
    score = { correct: 0, incorrect: 0 };
    localStorage.removeItem('quizScore');
    updateScoreboard();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);