import React, { useState } from 'react';

interface Question {
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

interface QuizProps {
  title?: string;
  questions: Question[];
}

export default function Quiz({ title, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = questions[currentQuestion];
  const isMultipleChoice = question.options && question.options.length > 0;

  const checkAnswer = () => {
    const userAnswer = isMultipleChoice ? selectedAnswer : inputAnswer.trim().toLowerCase();
    const correctAnswer = question.answer.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setInputAnswer('');
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setInputAnswer('');
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);

  if (completed) {
    return (
      <div className="quiz-container quiz-completed">
        <h3>Quiz Complete!</h3>
        <div className="quiz-score">
          <div className="quiz-score-number">{score}/{questions.length}</div>
          <div className="quiz-score-percent">{percentage}%</div>
        </div>
        <div className="quiz-score-message">
          {percentage === 100 && "Perfect! You've mastered this! 🎉"}
          {percentage >= 80 && percentage < 100 && "Great job! Almost perfect! 🌟"}
          {percentage >= 60 && percentage < 80 && "Good work! Keep practicing! 👍"}
          {percentage < 60 && "Keep studying - you'll get there! 💪"}
        </div>
        <button className="quiz-btn quiz-btn-restart" onClick={restart}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {title && <h3 className="quiz-title">{title}</h3>}

      <div className="quiz-progress">
        <div className="quiz-progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="quiz-question">
        <p>{question.question}</p>
      </div>

      {isMultipleChoice ? (
        <div className="quiz-options">
          {question.options!.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selectedAnswer === option ? 'selected' : ''} ${
                showResult
                  ? option.toLowerCase() === question.answer.toLowerCase()
                    ? 'correct'
                    : selectedAnswer === option
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="quiz-input-container">
          <input
            type="text"
            className={`quiz-input ${
              showResult
                ? inputAnswer.trim().toLowerCase() === question.answer.toLowerCase()
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !showResult && inputAnswer && checkAnswer()}
            placeholder="Type your answer..."
            disabled={showResult}
          />
        </div>
      )}

      {showResult && (
        <div className={`quiz-feedback ${
          (isMultipleChoice ? selectedAnswer : inputAnswer.trim()).toLowerCase() === question.answer.toLowerCase()
            ? 'correct'
            : 'incorrect'
        }`}>
          {(isMultipleChoice ? selectedAnswer : inputAnswer.trim()).toLowerCase() === question.answer.toLowerCase() ? (
            <span>✓ Correct!</span>
          ) : (
            <span>✗ The correct answer is: <strong>{question.answer}</strong></span>
          )}
          {question.explanation && <p className="quiz-explanation">{question.explanation}</p>}
        </div>
      )}

      <div className="quiz-actions">
        {!showResult ? (
          <button
            className="quiz-btn quiz-btn-check"
            onClick={checkAnswer}
            disabled={isMultipleChoice ? !selectedAnswer : !inputAnswer.trim()}
          >
            Check Answer
          </button>
        ) : (
          <button className="quiz-btn quiz-btn-next" onClick={nextQuestion}>
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
