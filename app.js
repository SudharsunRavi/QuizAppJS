const questions = [
    {
        question : '1+1',
        answers:[
            {text:'3', correct:'False'},
            {text:'2', correct:'True'},
            {text:'5', correct:'False'},
            {text:'None of the above', correct:'False'},
        ]
    },

    {
        question : 'Sivaji vaila',
        answers:[
            {text:'Jalebi', correct:'True'},
            {text:'Palkova', correct:'False'},
            {text:'Molaga', correct:'False'},
            {text:'Onnume illa', correct:'False'},
        ]
    },

    {
        question : 'Mark ',
        answers:[
            {text:'Manikam', correct:'False'},
            {text:'Machan', correct:'False'},
            {text:'Antony', correct:'True'},
            {text:'Jackie', correct:'False'},
        ]
    },

    {
        question : 'Hukum, ______ ka Hukum!',
        answers:[
            {text:'Rat', correct:'False'},
            {text:'Elephant', correct:'False'},
            {text:'Girafee', correct:'False'},
            {text:'Tiger', correct:'True'},
        ]
    },
];

const questionElement=document.getElementById("ques");
const answerBtn=document.getElementById("answer-optns");
const nextBtn=document.getElementById("next-btn");

let currentQuestionNumber=0;
let score=0;

function startQuiz(){
    currentQuestionNumber=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    //Question
    let currentQues=questions[currentQuestionNumber];
    let quesNum=currentQuestionNumber+1;
    questionElement.innerHTML=quesNum+". "+currentQues.question;
    //Options
    currentQues.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}

function resetState(){
    nextBtn.style.display="none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAns(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="True";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button=>{
        if(button.dataset.correct=="True"){
            button.classList.add("correct");
        }
        button.disabled= true;
    })
    nextBtn.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Your score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}

function handleNextBtn(){
    currentQuestionNumber++;
    if(currentQuestionNumber<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionNumber<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz()