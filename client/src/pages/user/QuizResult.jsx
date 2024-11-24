
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  FaRetweet,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaTrophy,
  FaHashtag,
} from "react-icons/fa";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state;
  const msg = "Quiz doesn't exists";
  if(!result) {
    return <Layout><div>No result data available.</div></Layout>; // Handle case where no data is passed
  }

  const percentageScore = result.score;

  const attemptDate = new Date(result?.createdAt).toLocaleDateString();
  const attemptTime = new Date(result?.createdAt).toLocaleTimeString();

    // Convert attemptTime from seconds to minutes and seconds
    const minutes = Math.floor(result?.attemptTime/60)
    const seconds = Math.floor(result?.attemptTime%60)    

  const feedbackMsg =
    percentageScore >= 80
      ? "Great Job!"
      : percentageScore >= 50
      ? "Good Effort! Keep practicing!"
      : "Don't give up! Try again!";

  return (
    <Layout>
      {!result ? (
        <div>No result found.</div>
      ) : (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">
            Quiz Result
          </h2>
          <div className="mb-3">
            <p className="text-md flex  items-center mb-2 text-gray-500">
              <FaHashtag className="mr-2 text-gray-400" />
              <strong>Quiz Code: &nbsp;</strong> {result.quiz?.quizCode || msg}
            </p>
            <p className="text-lg mb-2">
              <strong>Name : </strong> {result.user.name}{" "}
            </p>
            <p className="text-lg mb-2">
              <strong>Title : </strong> {result.quiz?.title || msg}{" "}
            </p>
            <p className="text-lg mb-2">
              <strong> Date : </strong> {attemptDate}{" "}
            </p>
            <p className="text-lg mb-2">
              <strong>  Time : </strong> {attemptTime}{" "}
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">

            {/* Correct answers */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" />
                <strong className="mr-2">Correct Answers:</strong> {result.correctAnswers} / {result.totalQuestions}
              </p>
            </div>
            {/* Time taken */}
            <div className="flex items-center justify-between mb-4">              
            <p className="text-xl flex items-center">
                <FaClock className="mr-2 text-yellow-500 animate-pulse" />                
                <strong className="mr-2">Total Time Taken:</strong> {minutes > 0 ? `${minutes} min` : ""}  {seconds} second{seconds !== 1 && 's'}
              </p>
            </div>

            {/* Score percent */}
            <div className="relative pt-1 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-medium text-green-700">
                  Score Percentage
                </span>
                <span className="text-sm font-medium">{percentageScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${percentageScore}%` }}
                ></div>
              </div>
            </div>

            {/* feedback */}
            <p className="text-lg text-center mt-4">
              <FaTrophy
                className={`inline-block mr-2 text-yellow-500 ${
                  percentageScore >= 80 ? "animate-bounce" : ""
                }`}
              />
              <strong>{feedbackMsg}</strong>
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button className=" flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200" onClick={() => navigate(`/user/quizdetail/${result.quiz._id}`)}>
              <FaRetweet className="mr-2" />
              Retake Quiz
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200" onClick={() => navigate(-1)}>
              <FaArrowLeft className="mr-2" />
              Back to Results
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default QuizResult;
