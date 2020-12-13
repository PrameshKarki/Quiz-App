//Global Variables
let INDEX = 0;


//Grabbing Elements from THE DOM
const currentQuestionNumber = document.getElementById('currentQuestionNumber');
const totalNumberOfQuestion = document.getElementsByClassName('totalNumberOfQuestion');
const question = document.getElementsByClassName('question')[0];
const options = document.getElementsByClassName('options');
const nextButton = document.getElementById('btn');
const history = document.getElementsByClassName('history')[0];
const currentScore = document.getElementsByClassName('currentScore');
const closeBanner=document.getElementById('closeBanner');


currentScore[0].innerText = 0;



//Creating Array
let questionOptions = Array.from(options);


//Array of collections of questions
const questionsCollection = [
    {
        question: 'Which of the following is not a reserved word in Javascript?',
        options: ['interface', 'throws', 'program', 'short'],
        correctAnswer: 'program'
    },
    {
        question: 'What is the HTML tag under which one can write the Javascript code?',
        options: ['<javascript>', '<scripted>', '<script>', '<js>'],
        correctAnswer: '<script>'
    },
    {
        question: 'Which of the following is the correct syntax to display "Hello World!" in an alert box using JavaScript?',
        options: ['alertbox("Hello World!");', 'msg("Hello World!");', 'msgbox("Hello World!");', 'alert("Hello World!");'],
        correctAnswer: 'alert("Hello World!");'
    
    },
    {
        question: 'Javascript is a ----- Side Scripting Language.',
        options: ['Server', 'ISP', 'Browser', 'None Of the above'],
        correctAnswer: 'Browser'
    },
    {
        question: 'Which function of an Array object calls a function for each element in the array?',
        options: ['forEach()', 'every()', 'forEvery()', 'each()'],
        correctAnswer: 'forEach()'
    },
    {
        question: 'Which was the first browser to support JavaScript?',
        options: ['Mozila Firefox', 'Netscape', 'Google Chrome', 'IE'],
        correctAnswer: 'Netscape'
    },
    {
        question: 'Which was the Javascript syntax for printing values in console?',
        options: ['print(5);', 'console.log(5);', 'printf("%d",5);', 'cout<<5;'],
        correctAnswer: 'console.log(5);'
    }


]

//function for shuffling Arrray
function shuffle(myArray) {
    for (let i = (myArray.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
}


//Function for setting total number question
let setTotalNumberOfQuestion = () => {
    Array.from(totalNumberOfQuestion).forEach((element) => {
        element.innerText = questionsCollection.length;
    })
}

//Function for setting currentQuestionNumber
let setCurrentQuestionNumber = (INDEX) => {
    currentQuestionNumber.innerText = (INDEX + 1);
}

//Function for displaying question and its options
let displayQuestion = (index) => {
    let currentQuestion = questionsCollection[index];
    question.innerText = currentQuestion.question;
    shuffle(currentQuestion.options);
    questionOptions.forEach((element, index) => {
        element.innerText = currentQuestion.options[index];
    })
    //add event listeners to the options
    questionOptions.forEach((element) => {
        element.addEventListener('click', validateAnswer);
    })


}

//Function for validating answer when the user clicks on options

let validateAnswer = (event) => {
    //Then remove event listener from the all options
    //{once:true} wasn't worked at this situation
    questionOptions.forEach((element) => {
        element.removeEventListener('click', validateAnswer);
    })
    //Change opacity of next button
    nextButton.style.opacity = 1;

    //add event listener to the next button;
    nextButton.addEventListener('click', displayNextQuestion, { once: true })


    let userAnswer = event.target.innerText;
    let correctAnswer = questionsCollection[INDEX].correctAnswer;
    if (userAnswer === correctAnswer) {
        currentScore[0].innerText++;
        displayCorrectAnswer(event.target);
        updateHistory(true);
    }
    else {
        displayWrongAnswer(event.target);
        //and check which option is true and display as a true answer
        checkTrueAns(INDEX);
        updateHistory(false);

    }

     // Check to change the button inner text into 'Check Result'
     if(INDEX===questionsCollection.length-1){
        nextButton.innerText='Check Result';
        displayData();
        nextButton.onclick=()=>{
            closeBanner.style.height='100%';
            closeBanner.style.opacity=1;

        }
    } 

}


//Function for displaying green color in background of correct option
function displayCorrectAnswer(target) {
    target.classList.add('sucess');
}

//Function for displaying red color in background of wrong option
function displayWrongAnswer(target) {
    target.classList.add('failure');
}

//Function for checking true option when user click wrong option
function checkTrueAns(index) {
    let currentQuestion = questionsCollection[index];
    questionOptions.forEach((element) => {
        if (element.innerText === currentQuestion.correctAnswer) {
            displayCorrectAnswer(element);
        }
    })
}


//Function for displaying next question when user clicks on next button
function displayNextQuestion() {
    nextButton.style.opacity = 0.8;
    resetClassList(questionOptions);
    if (INDEX < questionsCollection.length - 1) {
        INDEX++;
        setCurrentQuestionNumber(INDEX);
        displayQuestion(INDEX);
        
    }
   


}

//Function for removing all existing classes
function resetClassList(elements) {
    elements.forEach((element) => {
        element.className = 'options';
    })
}

//Function for updating history
function updateHistory(bool) {
    let createdDiv = document.createElement('div');
    let textNode = document.createTextNode('✓');
    createdDiv.append(textNode);
    if (bool === true)
        createdDiv.classList.add('sucess');
    else
        createdDiv.classList.add('failure');
    history.appendChild(createdDiv);

}

// To display final score
function displayData() {
    currentScore[1].innerText = currentScore[0].innerText;

}

//Calling Function
shuffle(questionsCollection);
setTotalNumberOfQuestion();
setCurrentQuestionNumber(INDEX);
displayQuestion(INDEX);

