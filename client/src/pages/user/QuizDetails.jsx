import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useQuiz } from "../../hooks/useQuiz";
import Layout from "../../components/layout/Layout";

const QuizDetails = () => {
  const { quizId } = useParams(); // Get quiz ID from URL parameters

  const { quiz, fetchQuizById, error, isLoading } = useQuiz();
  const navigate = useNavigate();

  const propertyClass = "font-semibold text-gray-700 inline-block";
  const valueClass = "text-gray-600 inline-block ml-3";

  useEffect(() => {
    fetchQuizById(quizId);
  }, [quizId]);

  if (isLoading)
    return <div className="text-center">Loading quiz details...</div>;
  if (error)
    return (
      <Layout>
        <div className="text-red-500 text-center">{error}</div>
      </Layout>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Quiz Details
        </h2>

        <div className="mb-4">
          <p className={propertyClass}>Quiz Code:</p>
          <p className={valueClass}>{quiz?.quizCode}</p>
        </div>

        <div className="mb-4">
          <p className={propertyClass}>Quiz Name:</p>
          <p className={valueClass}>{quiz?.title}</p>
        </div>

        <div className="mb-4">
          <p className={propertyClass}>Category:</p>
          <p className={valueClass}>{quiz?.category.name}</p>
        </div>

        <div className="mb-4">
          <p className={propertyClass}>Time Limit:</p>
          <p className={valueClass}>{quiz?.attemptLimit} seconds</p>
        </div>

        <div className="mb-4">
          <p className={propertyClass}>Total Questions:</p>
          <p className={valueClass}>{quiz?.questions.length}</p>
        </div>

        <h5 className="text-lg font-bold mt-4 mb-2 underline text-gray-800">
          Instructions:
        </h5>
        <ul className="list-disc pl-5 text-gray-600">
          <li>There is only one possible answer for every question.</li>
          <li>
            When completing the quiz, make sure you are in a quiet environment
            so you can concentrate well.
          </li>
          <li>The quiz will automatically submit when time is over.</li>
          <li>Read each question carefully before selecting your answer.</li>
          <li>
            If you are unsure about an answer, you can skip the question and
            return to it later if time permits.
          </li>
          <li>Make sure to check your answers before submitting the quiz.</li>
          <li>Once submitted, you will not be able to change your answers.</li>
          <li>
            If you encounter any technical issues during the quiz, please notify
            the administrator immediately.
          </li>
          <li>
            Ensure your device is fully charged or plugged in to avoid
            interruptions during the quiz.
          </li>
          <li>Good luck, and do your best!</li>
        </ul>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to={".."}
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </Link>

          <Link
            to={`/user/quiz/${quizId}/attempt`}
            // state={{ quiz }}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
