# Canvas Quiz Question and Selected Answer Extractor

# Regex to find all the underscore sequences that need replacement with just 3 underscores
# (?<!_)(_{1,2}|_{4,})(?!_)

import pyperclip
from bs4 import BeautifulSoup

file_name = ''
while True:
    print("Please input the name (extension included) of the HTML file to be parsed.")
    input_name = input("File:  ")
    try:
        f = open(input_name)
        f.close()
        file_name = input_name
        break
    except FileNotFoundError as error:
        print(error)

html = ''
with open(file_name) as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
    
questions = soup.find_all('div', class_='question_text')
answers = soup.find_all('div', class_='selected_answer') # "correct_answer" is the class to use if correct answers are known

final_str = ''
for q, a in zip(questions, answers):
    final_str += f"Q: {q.text.strip()}\nA: {(string := a.find('div', class_='answer_text').text.strip().replace('.', ''))[0].upper() + string[1:]}\n\n"

print(final_str)
pyperclip.copy(final_str)