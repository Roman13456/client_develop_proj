const quizBtn = document.querySelector('.quizBtn')
const hideQuizBtn = document.querySelector('.quizWindow section .closeBtn')//
const quizWindow = document.querySelector('.quizWindow')
const resultBtn = document.querySelector('.quizWindow .resultBtn')

quizBtn.addEventListener("click",()=>{
    if(!trigger){
        input = prompt("Enter your name")
        if(input!==null && input.trim())trigger = 1
    }
    if ( trigger){
        quizWindow.hidden = false
    }
})

let trigger = 0
hideQuizBtn.addEventListener("click", hideQuiz)
function hideQuiz(){
    quizWindow.hidden = true
}
const quizAnswers = ['b','b','a','c','b']
let input = ''
resultBtn.addEventListener("click",()=>{
    const bool = confirm("Are u sure u want to get you score? Your answer will be cleared afterwards")
    if(bool){
        genshinImpactQuiz()
        trigger = 0
        const questions = document.querySelectorAll(".quizWindow .question label:nth-child(2) input")
        questions.forEach((e,idx)=>{
            e.checked = true
        })
        hideQuiz()
    }
})

function genshinImpactQuiz(){
    const questions = document.querySelectorAll(".quizWindow .question input:checked")
    console.log(questions)
    let counter = 0
    for(let i = 0; i<quizAnswers.length; i++){
        console.log(questions[i])
        if(questions[i].value === quizAnswers[i]){
            counter++
        }
    }
    alert(`${input} got a score: ${counter}/5`)
}

function aboutDeveloper(surname, name, position='default'){
    console.log(`The developer is: ${name} ${surname}. Посада - ${position}`)
}
aboutDeveloper('Хромишин','Роман')
function outputBiggerString (str1, str2){
    if(str1.length>str2.length){
        alert(`Рядок "${str1}" більший`)
    }else if(str2.length>str1.length){
        alert(`Рядок "${str2}" більший`)
    }else {
        alert(`Рядки "${str1}", "${str2}" однакові за розміром`)
    }
}
outputBiggerString("lorem","lorem ipsum")


document.body.style.background = 'pink'; // колір фону - червоний 
setTimeout(() => document.body.style.background = '', 5000);//30000


const locationKazuhaPage = document.querySelector(".locationKazuhaPage")
locationKazuhaPage.addEventListener("click",()=>{
    location.href = "http://127.0.0.1:5500/kazuha.html"
})










    
