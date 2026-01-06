"use client";

import { useState } from "react";
import { quizQuestions } from "@/data/questions";
import Image from "next/image";

export default function Home() {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];

  // Handle answer selection
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer

    setSelectedAnswer(index);
    setShowResult(true);

    // Check if answer is correct
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }

    // Track answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  // Get button style based on answer state
  const getButtonClass = (index: number) => {
    const baseClass =
      "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-semibold";

    if (selectedAnswer === null) {
      return `${baseClass} border-gray-300 text-black hover:border-blue-500 hover:bg-blue-50 cursor-pointer`;
    }

    if (index === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-100 text-green-800`;
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-100 text-red-800`;
    }

    return `${baseClass} border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed`;
  };

  // Show final results
  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <main className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-12 text-center">
          <div className="mb-8">
            {percentage >= 70 ? (
              <div className="text-6xl mb-4">🏆</div>
            ) : percentage >= 50 ? (
              <div className="text-6xl mb-4">👍</div>
            ) : (
              <div className="text-6xl mb-4">📚</div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Complete!
          </h1>

          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {score}/{quizQuestions.length}
            </div>
            <p className="text-2xl text-gray-600">{percentage}% Correct</p>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-green-500 transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            {percentage >= 70
              ? "Excellent work! You're a football expert! ⚽"
              : percentage >= 50
                ? "Good job! Keep learning about football!"
                : "Keep practicing! You'll improve with time!"}
          </p>

          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors duration-200"
          >
            Take Quiz Again
          </button>
        </div>
      </main>
    );
  }

  // Main quiz interface
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
            ⚽ Football Quiz
          </h1>
          <p className="text-gray-600">Test your football knowledge!</p>
        </div>

        {/* Score & Progress */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-lg font-bold text-blue-600">
              Score: {score}/{quizQuestions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          {/* Question Image */}
          <div className="mb-6 relative w-full h-48 sm:h-64">
            <Image
              src={question.image}
              alt="Football question"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={getButtonClass(index)}
              >
                <span className="flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-200 text-center leading-8 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {showResult && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === question.correctAnswer
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
              }`}
            >
              <p
                className={`font-bold text-lg ${
                  selectedAnswer === question.correctAnswer
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {selectedAnswer === question.correctAnswer
                  ? "✓ Correct! Well done!"
                  : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors duration-200"
            >
              {currentQuestion < quizQuestions.length - 1
                ? "Next Question →"
                : "See Results"}
            </button>
          )}

          {/* Instructions */}
          {!showResult && (
            <p className="text-center text-gray-500 text-sm mt-4">
              Select an answer to continue
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
