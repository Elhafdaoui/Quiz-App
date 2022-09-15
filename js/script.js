// CREATE A QUIZ CLASS
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    if(window.event )  
    {  
      alert("Browser back button is clicked...");  
    }  
  else  
    { 
      alert("Page could be exit, after 10 mins...");  
    }  
  }
  
  
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

// Create a question Class
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    // show options
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

// GUESS ANSWER
function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    displayQuestion();
  };
}

// SHOW QUIZ PROGRESS
function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let ProgressElement = document.getElementById("progress");
  ProgressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// SHOW SCORES
function showScores() {
  let quizEndHTML = `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="#" onclick="againQuiz()">Take Quiz Again</a>
    </div>
    `;
  let quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHTML;
}

// create questions here
let questions = [
  new Question(
    "Entomology is the science that studies?",
    ["Cultures", "Insects", "Crime", "Law"],
    "Insects"
  ),
  new Question(
    "Eritrea is a country in?",
    ["Asia", "Europe", "Americans", "Africa"],
    "Africa"
  ),
  new Question(
    "What is the square root of 441?",
    ["29", "19", "21", "31"],
    "21"
  ),
  new Question(
    "Which of these cities is furthest north?",
    ["Amsterdam", "Stockholm, Sweden", "Vienna, Austria", "All"],
    "Stockholm, Sweden"
  ),
  new Question("120/1000 = ?", ["12%", "120%", "1.2%", "3.1%"], "12%"),
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();

// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 60);
      let min = Math.floor(quizTime / 60) % 60;
      counting.innerHTML = `TIME: ${min} : ${sec}`;
    }
  }, 1000);
}

startCountdown();

// Again quiz

function againQuiz() {
  window.location.reload();
}

// Delect tab switching
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState == "visible") {
    document.getElementById("tabSwitchShow").click()
    setTimeout(() => {
      document.getElementById("tabSwitchDismiss").click()
    }, 60000)
  }
});
