document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    // Prompt the user to input the token and classId
    const token = prompt("Please enter your token:");
    const classId = prompt("Please enter your classId:");
    const CurrentEpochTime = Math.floor((Date.now() - 60000) / 1000) % 10000000000; // Get the epoch time of one minute ago
    if (!token || !classId) return;

    try {
        const response = await fetch("/edpuzzle", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'set-cookie': `__eoi=ID=33320d6f248e4ae9:T=1711240478:RT=${CurrentEpochTime}:S=AA-AfjYf1uKwpbMgET6R482nyN0s; token=${token}`
                                                           
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
        // Handle the response data
        displayQuestions(data.assignments[0].media.questions);
    } catch (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
        // You might want to provide user feedback here, e.g., alert("Error fetching assignments: " + error.message);
    }
}

function displayQuestions(questions) {
    const container = document.getElementsByClassName("edpuzzle-answers")[0]; // Access the first element

    questions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = question.question;

        const answersElement = document.createElement('div');
        answersElement.classList.add('answers');

        question.answers.forEach(answer => {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.innerHTML = answer.text;
            answersElement.appendChild(answerElement);
        });

        container.appendChild(questionElement);
        container.appendChild(answersElement);
    });
}
