import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Question from "./Question";
import Timer from "./Timer";
import { useQuiz } from "../../hooks/useQuiz";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [startTime, setStartTime] = useState(null); // state to Track quiz start time
  const { quiz, fetchQuizById, error, isLoading } = useQuiz();

  useEffect(() => {
    fetchQuizById(quizId);
  }, [quizId]);

  useEffect(() => {
    // Set start time once when the quiz is loaded
    if (quiz && !startTime) {
      setStartTime(Date.now());
    }
  }, [quiz, startTime]); // Trigger only when quiz or startTime changes

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (activeQuestion < quiz.questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit the quiz.");
      return;
    }

    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    // Calculate the score
    quiz.questions.forEach((question) => {
      
      const selectedAnswerId = selectedAnswers[question._id];
      const correctAnswer = question.options.find((option) => option.isCorrect);

      if (selectedAnswerId === correctAnswer._id) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / totalQuestions) * 100;
    // Calculate time taken by the user
    const attemptTime = Math.floor((Date.now() - startTime) / 1000); // Time in seconds

    const resultData = {
      user: user._id,
      quiz: quiz._id,
      score,
      totalQuestions,
      correctAnswers,
      attemptTime,
    };

    console.log(resultData);

    try {
      await axiosInstance.post("/result/", resultData);
      toast.success("Quiz submitted successfully!");
      // setQuiz(null);
      navigate("/user/resultlist");
    } catch (error) {
      toast.error(error.message || "Failed to submit quiz results.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        {isLoading ? (
          <div className="text-center">Loading quiz...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : quiz ? (
          <>
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
              {quiz.title}
            </h2>

            {/* Timer Component */}
            <Timer initialTime={quiz.attemptLimit} onTimeUp={handleSubmit} />

            <Question
              key={quiz.questions[activeQuestion]._id}
              question={quiz.questions[activeQuestion]}
              selectedAnswer={
                selectedAnswers[quiz.questions[activeQuestion]._id]
              }
              onAnswerChange={handleAnswerChange}
            />

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={activeQuestion === 0}
                className={`bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200 ${
                  activeQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              {activeQuestion < quiz.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">Quiz not found</div>
        )}
      </div>
    </div>
  );
};

export default QuizAttempt;
