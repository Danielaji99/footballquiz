"use client"; // Add this at the very top

import { useState } from "react";
import { quizQuestions } from "@/data/questions";

export default function Home() {
  // State to track current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get the current question object
  const question = quizQuestions[currentQuestion];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Football Quiz
        </h1>

        {/* Progress indicator */}
        <div className="mb-6 text-center">
          <span className="text-lg font-semibold text-black-700">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Question Image */}
          <div className="mb-6">
            <img
              src={question.image}
              alt="Question"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <span className="font-semibold text-gray-700">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-300 rounded-lg font-semibold disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={currentQuestion === quizQuestions.length - 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
