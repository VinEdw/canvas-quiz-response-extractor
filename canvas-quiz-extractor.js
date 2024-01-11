// Canvas Quiz Question and Selected Answer Extractor

/**
 * Copy the input text to the clipboard using the navigator API
 * @param {string} text Text to copy to the clipboard
 */
function writeToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log('Copy Successful');
    },
    () => {
      console.log('Copy Failed');
    }
  );
}

/**
 * Find all the problems on the quiz page. These are div elements that are children of the parent div with an id of questions.
 * @returns {HTMLCollection}
 */
function extractProblems() {
  const problemHolder = document.querySelector('div#questions')
  const problemChunk = problemHolder.children;
  return problemChunk;
}

/**
 * @typedef {Object} problemTextCollection
 * @property {string} questionText Question text
 * @property {string} selectedAnswerText Selected answer text
 * @property {string} correctAnswerText Correct answer text
 */

/**
 * Extract the key text (question text, selected answer text, and correct answer text) from the input problem element
 * @param {Element} problem HTML element for a problem on the quiz page
 * @returns {problemTextCollection}
 */
function extractKeyTextFromProblem(problem) {
  const question = problem.querySelector('div.question_text');
  const selectedAnswer = problem.querySelector('div.selected_answer div.answer_text');
  const correctAnswer = problem.querySelector("div.correct_answer div.answer_text")
  return {
    questionText: question.textContent,
    selectedAnswerText: (selectedAnswer ? selectedAnswer.textContent : ""),
    correctAnswerText: (correctAnswer ? correctAnswer.textContent : ""), // if correct answer element exists, return its text content; otherwise, return a blank string
  };
}

/**
 * Create a problem string based on the text for the question and answer
 * @param {string} questionText Text for the question
 * @param {string} answerText Text for the answer
 * @returns {string}
 */
function stringFromProblemText(questionText, answerText) {
  let qText = questionText;
  let aText = answerText;

  qText = qText.trim(); // remove leading and trailing whitespace
  qText = qText.replaceAll(/(?<!_)(_{1,2}|_{4,})(?!_)/g, '___'); // change all underscore sequences to have a length of three

  aText = aText.trim(); // remove leading and trailing whitespace
  aText = aText[0].toUpperCase() + aText.slice(1); // capitalize the first letter of the answer text
  if (aText[aText.length - 1] === '.') {
    // remove a period if there is one at the end of the answer text
    aText = aText.slice(0, -1);
  }
  return `Q: ${qText}\nA: ${aText}\n\n`;
}

/**
 * Find all the problems on the Canvas quiz page, extract the question and answer text, put them into a string, and copy that string to the clipboard
 */
function main() {
  const problemChunk = extractProblems();
  let returnStr = '';
  for (const problem of problemChunk) {
    const {questionText, selectedAnswerText, correctAnswerText} = extractKeyTextFromProblem(problem);
    // use the correct answer text if available; otherwise, use the selected answer text
    if (correctAnswerText) {
      returnStr += stringFromProblemText(questionText, correctAnswerText);
    }
    else {
      returnStr += stringFromProblemText(questionText, selectedAnswerText);
    }
  }
  writeToClipboard(returnStr);
}

setTimeout(main, 3000); // the main function will run after a 3000 millisecond delay; this gives the user time to refocus the canvas page
