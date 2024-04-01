export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-eighteen.json')
    const quiz: Question[] = await response.json()

    let correctAnswers: string [] = []

    for (let question of quiz) {
        correctAnswers.push(question.answers[1].text)
        shuffleArray(question.answers)
    }

    return {
        correctAnswers,
        quiz
    }
}

function shuffleArray(array: {text: string, correct: boolean}[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}