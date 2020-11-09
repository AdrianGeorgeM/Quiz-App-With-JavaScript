const baseUrl ="https://opentdb.com/api.php?amount=1";
const containerEl = document.querySelector(".container");
const form = document.querySelector("#quiz_form");
const quesEl = document.querySelector(".qus");
const optionEl = document.querySelector(".all_options");
const buttonE1 = document.querySelector(".buttons");
const ScoreEl = document.querySelector(".scoreBoard .score-num");
const answeredEl = document.querySelector(".scoreBoard .answered-num");

let question, answer;
let options =[];
let score = 0;
let answeredQus =0;




window.addEventListener("DOMContentLoaded",quizApp);

 async function quizApp() {
   const data = await fetchQuiz();
   question = data[0].question;
   options = [];
   answer = data[0].correct_answer;
   data[0].incorrect_answers.map(option => options.push(option));
   options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);
   
   generateTemplate(question, options);
   console.log("answer");
   
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(e.target.quiz.value){
        checkQuiz(e.target.quiz.value);
    e.target.querySelector("button").style.display ="none";
    generateButtons();
        
}else{
        return  
    }
});

async function fetchQuiz(){
    const response = await fetch(baseUrl);
    const data = await response.json();

//    console.log(data.results);
    return data.results;
    
}

function generateTemplate(question,options){

    optionEl.innerHTML = " ";
    quesEl.innerText = question;
    options.map((option, index)  =>{
        const item = document.createElement("div");
        item.classList.add("option");
        item.innerHTML = `<input type="radio"id ="option${index+1}"value="${option}" name="quiz">
        <label for="option${index+1}">${option}</label>
        `
        optionEl.appendChild(item);
    });

}

function checkQuiz(selected){
   answeredQus++;
    if(selected === answer){
        score++;
    }
    updateScoreBoard();
    form.quiz.forEach(input => {
        if(input.value === answer){
           input.parentElement.classList.add("correct"); 
        }
    });
}

function updateScoreBoard(){
    ScoreEl.innerText =score;
    answeredEl.innerText = answeredQus;
}

function generateButtons(){
    const finishBtn = document.createElement("button");
    finishBtn.innerText = "Finish";
    finishBtn.setAttribute("type", "button");
    finishBtn.classList.add("finish-btn");
    buttonE1.appendChild(finishBtn);

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next Quiz";
    nextBtn.setAttribute("type", "button");
    nextBtn.classList.add("next-btn");
    buttonE1.appendChild(nextBtn);

    finishBtn.addEventListener("click", finishQuiz);
    nextBtn.addEventListener("click", getNextQuiz);
}

function getNextQuiz(){
    const nextBtn = document.querySelector(".next-btn");
    const finishBtn = document.querySelector(".finish-btn");

    buttonE1.removeChild(nextBtn);
    buttonE1.removeChild(finishBtn);

    buttonE1.querySelector('button[type="submit"]').style.display = "block";
    quizApp();

}

function finishQuiz(){
    
    const nextBtn = document.querySelector(".next-btn");
    const finishBtn = document.querySelector(".finish-btn");

    buttonE1.removeChild(nextBtn);
    buttonE1.removeChild(finishBtn);

    buttonE1.querySelector('button[type="submit"]').style.display = "block";

    const overlay = document.createElement("div");
    overlay.classList.add("result-overlay");
    overlay.innerHTML = `  
    <div class="final-result">${score}/${answeredQus}</div>
    <button>Play Again</button>
    `
    containerEl.appendChild(overlay);
    overlay.addEventListener("click",()=>{

    });

}

function playAgain(){
    score = 0;
    answeredQus=0;

    quizApp();
}