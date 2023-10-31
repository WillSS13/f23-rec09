import React, { Component, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

interface QuizState {
  quizCore: QuizCore
  selectedAnswer: string | null
}

const Quiz: React.FC = () => {

  const [state, setState] = useState<QuizState>({
    quizCore: new QuizCore(),
    selectedAnswer: null,  // Initialize the selected answer.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      quizCore.nextQuestion();
      setState((prevState) => ({ ...prevState, selectedAnswer: null }));
    }
  }

  const { quizCore, selectedAnswer } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        {/* <p>Final Score: {score} out of {questions.length}</p> */}
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getNumQuestions( )}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      {(quizCore.hasNextQuestion()) ? (
        <button onClick={handleButtonClick}>Next Question</button>
      ) : (
        <button onClick={handleButtonClick}>Submit</button>
      )}

    </div>
  );
};

export default Quiz;
