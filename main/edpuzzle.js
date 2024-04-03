document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    // Prompt the user to input the token and classId
    const token = prompt("Please enter your token:");
    const classId = prompt("Please enter your classId:");
    if (!token || !classId) return;

    try {
        const response = await fetch("/edpuzzle", {
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
