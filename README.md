# canvas-quiz-response-extractor

This repository contains two scripts that were made to extract questions and a student's selected answers from a quiz on Canvas (a learning managment system by Instructure).
The python script was the first one made. It requires the user to download the quiz page as an HTML file, and run the python script on it. 
The javascript script was the second one made. It requires the user to copy and paste the code into the browser console, run it, and refocus the page within 3 seconds of running the script. 
Both scripts copy the resulting "Q: {question} A: {answer} ..." string to the device clipboard. The user can then paste the text into their preferred note taking app for later reference and easier searching.
