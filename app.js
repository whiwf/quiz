const questions = [];
fetch("quiz.json")
  .then((data) => data.json())
  .then((data) => questions.push(...data));

//define
const startLayout = document.querySelector("#startLayout");
const startButton = document.querySelector("#startQuestionButton");
const questionLayout = document.querySelector("#questionLayout");
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const controlButtons = document.querySelectorAll("#controlButtons button");

const PREV_BUTTON = controlButtons[0];
const SUBMIT_BUTTON = controlButtons[1];
const NEXT_BUTTON = controlButtons[2];
const CHOOSE_COLOR = "indigo-500";
const WRONG_COLOR = "red-500";
const CORRECT_COLOR = "green-500";

var currentQuestion = 0;
var choose = [];
var hadSubmitted = [];

//function
function showQuestion() {
  startLayout.classList.add("hidden");
  questionLayout.classList.remove("hidden");
  //show question
  loadData(currentQuestion);
}

function loadData(index) {
  if(index == 0){
    PREV_BUTTON.disabled = true;
    NEXT_BUTTON.disabled = false;
  } else if(index == questions.length - 1){
    PREV_BUTTON.disabled = false;
    NEXT_BUTTON.disabled = true;
  } else {
    PREV_BUTTON.disabled = false;
    NEXT_BUTTON.disabled = false;
  }
  if(hadSubmitted[index]){
    submit();
    return;
  }
  choose[index] = 0;
  hadSubmitted[index] = false;
  question.textContent = questions[index].question;
  let html = questions[index].answers
    .map((answer, i) => {
      return `<li class="text-center cursor-pointer border border-${CHOOSE_COLOR}	rounded p-3" data-index="${i}">
      ${answer}
    </li>`;
    })
    .join("");
  answers.innerHTML = html;
  
}

function chooseAnswer(e) {
  let answer = e.target;
  if (!answer.matches("li") || hadSubmitted[currentQuestion]) return;
  let list = answers.querySelectorAll('li');
  for(ans of list){
    ans.classList.remove(`bg-${CHOOSE_COLOR}`, "text-white");
  }
  choose[currentQuestion] = answer.dataset.index;
  answer.classList.add(`bg-${CHOOSE_COLOR}`, "text-white");
  SUBMIT_BUTTON.disabled = false;
}

function submit(){
  clear();
  hadSubmitted[currentQuestion] = true;
  SUBMIT_BUTTON.disabled = true;
  
  let correct = questions[currentQuestion].correct; 
  let chosen = answers.querySelector([`[data-index="${choose[currentQuestion]}"]`]);
  let correctChoose = answers.querySelector([`[data-index="${correct}"]`]);

  chosen.classList.remove(`bg-${CHOOSE_COLOR}`, `border-${CHOOSE_COLOR}`, "text-white");

  correctChoose.classList.remove(`border-${CHOOSE_COLOR}`, "text-white");

  if(choose[currentQuestion] != correct){
    chosen.classList.add(`bg-${WRONG_COLOR}`, `border-${WRONG_COLOR}`, "text-white");
  }
  correctChoose.classList.add(`bg-${CORRECT_COLOR}`, `border-${CORRECT_COLOR}`, "text-white");
}

function clear(){
  let list = answers.querySelectorAll('li');
  for(ans of list){
    ans.classList.remove(`bg-${WRONG_COLOR}`, `border-${WRONG_COLOR}`, "text-white");
    ans.classList.remove(`bg-${CORRECT_COLOR}`, `border-${CORRECT_COLOR}`, "text-white");
    ans.classList.add(`border-${CHOOSE_COLOR}`);
  }
}
function next(){
  loadData(++currentQuestion);
}

function prev(){
  loadData(--currentQuestion);
}

//event
startButton.addEventListener("click", showQuestion);
answers.addEventListener("click", chooseAnswer);
SUBMIT_BUTTON.addEventListener('click', submit);
NEXT_BUTTON.addEventListener('click', next);
PREV_BUTTON.addEventListener('click', prev);
