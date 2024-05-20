document.getElementById('fetchDataForm').addEventListener('submit', async function(event) {
    event.preventDefault();


    const username = document.getElementById('fetch-username').value;
    const password = document.getElementById('fetch-password').value;

    const loginData = {
        username: username,
        password: password
    };

    try {
        const login_response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(loginData)
        });

        if (!login_response.ok) {
            throw new Error('Network response was not ok');
        }

        const token = await login_response.json();
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
});





document.getElementById('grabTokenForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const classId = document.getElementById('class-id').value;
    const edpuzzleToken = document.getElementById('grab-token').value;

    try {
        const response = await fetch('/edpuzzle-media', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({
                token: edpuzzleToken,
                classId: classId,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        data.assignments.forEach((assignment) => {
            displayQuestions(assignment.media.title, assignment.media.questions);
        });

    } catch (error) {
        console.log(error);
        const loadingElement = document.getElementsByClassName('AnswersAppears')[0];
        loadingElement.textContent = 'Invalid edpuzzle token or classid';
        loadingElement.classList.remove('response-progress');
        loadingElement.classList.add('response-fail');
        var errorOccurred = true;
    } finally {
        if (!errorOccurred) {
            const loadingElement = document.getElementsByClassName('AnswersAppears')[0];
            loadingElement.classList.remove('response-progress');
            loadingElement.classList.add('response-success');
            loadingElement.textContent = 'Success! Here are your answers!';
        }
    }
});

function displayQuestions(title, questions) {
    const container = document.getElementsByClassName('edpuzzle-answers')[0];
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    container.appendChild(titleElement);

    questions.forEach((question) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = question.question;

        const answersElement = document.createElement('div');
        answersElement.classList.add('answers');
        if (question.answers) {
            question.answers.forEach((answer) => {
                const answerElement = document.createElement('div');
                answerElement.classList.add('answer');
                answerElement.innerHTML = answer.text;
                answersElement.appendChild(answerElement);
            });
        } else {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.innerHTML = 'Free response question';
            answerElement.style.backgroundColor = 'rgb(255, 53, 53)';
            answersElement.appendChild(answerElement);
        }

        container.appendChild(questionElement);
        container.appendChild(answersElement);
    });
}

document.getElementById('refresh-button').addEventListener('click', function() {
    location.reload();
});