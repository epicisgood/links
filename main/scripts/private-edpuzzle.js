// edpuzzle patched private edpuzzle hacks

// document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    const token = prompt("Please enter your token:");
    const classId = prompt("Please enter your classId:");
    if (!token || !classId) return;

    const loadingElement = document.getElementsByClassName('AnswersAppears')[0];
    loadingElement.classList.remove('response-fail', 'response-success', 'response-progress');
    loadingElement.classList.add('response-progress')
    loadingElement.textContent = 'Fetching assignments...';

    try {x
        const response = await fetch("/private-edpuzzle", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",

            },
            body: JSON.stringify({
                token,
                classId
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        const data = await response.json();
        data.assignments.forEach(assignment => {
            displayQuestions(assignment.media.title, assignment.media.questions);
        });
    } catch (error) {
        console.log(error)
        loadingElement.textContent = 'Invalid edpuzzle token or classid';
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

// Private edpuzzle are no longer working


document.getElementById('GrabToken').addEventListener('click', tokengrab)

async function tokengrab() {
    const username = prompt('Enter your edpuzzle username:');
    const password = prompt('Enter your password!');

    try {
        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const token = await response.json();
        const authorizationHeader = token['authorization'];

        const tokenParts = authorizationHeader.split(' ');
        const tokenWithoutBearer = tokenParts[1];



        const TokenGenerated = document.getElementById('tokeninfo');
        TokenGenerated.innerHTML = 'Copy your edpuzzle token below!';

        const ResponseElement = document.getElementsByClassName('TokenResponse')[0];
        ResponseElement.classList.add('TokenResponse');
        ResponseElement.style.backgroundColor = 'red';
        ResponseElement.textContent = tokenWithoutBearer;

    } catch (error) {
        console.error(error);
    }
}



document.getElementById('refresh-button').addEventListener('click', refresh)

function refresh() {
    location.reload();

}