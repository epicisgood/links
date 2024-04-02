document.getElementById('fetchDataButton').addEventListener('click', edpuzzle);

async function edpuzzle() {
    // Prompt the user to input the token and classId
    const token = prompt("Please enter your token:");
    const classId = prompt("Please enter your classId:");

    // If the user cancels the prompt or doesn't provide a token or classId, exit the function
    if (!token || !classId) return;

    try {
        const response = await fetch("/edpuzzle", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'Cookie': `_gcl_au=1.1.680293524.1711921265; _ga=GA1.1.278429596.1711921265; __gads=ID=6a949120f3b84579:T=1711240478:RT=1712018952:S=ALNI_MbHZhKxGEiLcuJE-VWsy-z9hZXkmg; __gpi=UID=00000dd516633973:T=1711240478:RT=1712018952:S=ALNI_MakCljffK6VdSLlCkzPk8hBZmP9LQ; __eoi=ID=33320d6f248e4ae9:T=1711240478:RT=1712018952:S=AA-AfjYf1uKwpbMgET6R482nyN0s; token=${token}; FCNEC=^%^5B^%^5B^%^22AKsRol_CfJkrwswR5lUCAaSkOXNRlb9nKUFO-tVOsI_govj0Dz7uF1RvOEj0nka_u2S-dzilmFo9AdnePR9aQcL0H6tOcX-aXpMd96JXu9JmnQ6Y4jQzvGttELtDJLFHe7G8vR03YsabsCIX7lgiaOMxwAVEfDlT0A^%^3D^%^3D^%^22^%^5D^%^2Cnull^%^2C^%^5B^%^5B2^%^2C^%^22^%^5B^%^5B^%^5B^%^5B1^%^2Cnull^%^2C^%^5B1711924913^%^2C809490000^%^5D^%^2C10^%^5D^%^5D^%^5D^%^2C^%^5Bnull^%^2C6^%^2C^%^5B1711980291^%^2C351215000^%^5D^%^5D^%^5D^%^22^%^5D^%^5D^%^5D; _ga_K836MS1B0K=GS1.1.1712018950.5.1.1712019000.10.0.0^`
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
