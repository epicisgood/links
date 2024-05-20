document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    const assignment = prompt("Paste in your edpuzzle url");

    const loadingElement = document.getElementsByClassName('AnswersAppears')[0];
    loadingElement.classList.remove('response-fail', 'response-success', 'response-progress');
    loadingElement.classList.add('response-progress')
    loadingElement.textContent = 'Fetching assignments...';

    try {
        const response = await fetch("/public-edpuzzle", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",

            },
            body: JSON.stringify({
                assignment
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        const data = await response.json();
        
    } catch (error) {
        console.log(error)
        loadingElement.textContent = 'Invalid assignmentid. This is a private edpuzzle sadly.';
        loadingElement.classList.remove('response-progress')
        loadingElement.classList.add('response-fail')
        var errorOccurred = true;
    } finally {
        if (!errorOccurred) {
            loadingElement.classList.remove('response-progress')
            loadingElement.classList.add('response-success')
            loadingElement.textContent = 'Success! Here are your answers!';
        }
    }
}

function displayQuestions(title, questions) {
    const container = document.getElementsByClassName("edpuzzle-answers")[0];
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    container.appendChild(titleElement);



    questions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = question.question;

        const answersElement = document.createElement('div');
        answersElement.classList.add('answers');
        if (question.answers) {
            question.answers.forEach(answer => {
                const answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                answerElement.innerHTML = answer.text;
                answersElement.appendChild(answerElement);
            })
        };
        if (!question.answers) {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.innerHTML = 'Free response question';
            answerElement.style.backgroundColor = 'rgb(255, 53, 53)';
            answersElement.appendChild(answerElement);
        }

        container.appendChild(questionElement);
        container.appendChild(answersElement);
    });
};
