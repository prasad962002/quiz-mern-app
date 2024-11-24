import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";

const AdminQuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quiz, isLoading, error, fetchQuizById, deleteQuizById, togglePublishQuiz } = useQuiz();

  useEffect(() => {
    fetchQuizById(quizId);
  }, [quizId]);

  const handleTogglePublish = async () => {
    await togglePublishQuiz(quizId);
    await fetchQuizById(quizId);
  };

  const handleDeleteQuiz = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuizById(quizId);
      navigate("/admin/allquiz");
    }
  };

  return (
    <Layout role="admin">
      {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!isLoading && !error && (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">{quiz?.title}</h2>
          <p className="text-lg mb-6">
            <b>Description: </b>{quiz?.description || "No description available"}
          </p>

          <h3 className="text-xl font-semibold mb-4">Questions:</h3>

          <div className="space-y-6">
            {quiz?.questions.map((question, i) => (
              <div key={question._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg">{i + 1}. {question.title}</h4>
                <div className="mt-2 space-y-2">
                  {question.options.map((option) => (
                    <div key={option._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        readOnly
                        className="mr-2"
                      />
                      <span>{option.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between space-x-4">
            <button
              onClick={handleTogglePublish}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${quiz?.isPublished ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {quiz?.isPublished ? "Unpublish" : "Publish"}
            </button>

            <button
              onClick={handleDeleteQuiz}
              className="px-6 py-3 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Delete Quiz
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminQuizDetail;
