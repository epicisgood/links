document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    // Prompt the user to input the token and classId
    const token = prompt("Please enter your token:");
    const classId = prompt("Please enter your classId:");

    // If the user cancels the prompt or doesn't provide a token or classId, exit the function
    if (!token || !classId) return;

    try {
        // Set the cookie
        document.cookie = '_ga=GA1.1.2082089131.1711240477; _gcl_au=1.1.655362806.1711240477; token=' + encodeURIComponent(token) + '; __gads=ID=6a949120f3b84579:T=1711240478:RT=1711902748:S=ALNI_MbHZhKxGEiLcuJE-VWsy-z9hZXkmg; __gpi=UID=00000dd516633973:T=1711240478:RT=1711902748:S=ALNI_MakCljffK6VdSLlCkzPk8hBZmP9LQ; __eoi=ID=33320d6f248e4ae9:T=1711240478:RT=1711902748:S=AA-AfjYf1uKwpbMgET6R482nyN0s; FCNEC=%5B%5B%22AKsRol-YzDOYCuKrTEk599iWGJlG8JuJCfJfWdiDuBtZ-4cxRN4CdU_pnSYrXG_gLZLdjViiULS5Kyd_Z34XLtW5JF9xUZFy48vCeSq2W1XRHY9FFW6PTOZ-MGOGd6CJ2SokrSLCd4DOVJugYJKJrvrxdHTJnoSmdQ%3D%3D%22%5D%2Cnull%2C%5B%5B2%2C%22%5B%5B%5B%5B1%2Cnull%2C%5B1711839620%2C30988000%5D%2C10%5D%5D%5D%2C%5Bnull%2C26%2C%5B1711240481%2C469855000%5D%5D%5D%22%5D%5D%5D; _ga_K836MS1B0K=GS1.1.1711902746.6.1.1711902753.53.0.0';

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
