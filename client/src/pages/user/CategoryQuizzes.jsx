import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Use Link for navigation
import Layout from "../../components/layout/Layout";
import { useQuiz } from "../../hooks/useQuiz";

const CategoryQuizzes = () => {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    quizzes = [],
    fetchAllQuizzes,
    fetchQuizzesByCategory,
    isLoading,
    error,
  } = useQuiz();

  console.log(quizzes);

  useEffect(() => {
    const fetchQuizzes = async () => {
      categoryId == "all"
        ? await fetchAllQuizzes()
        : await fetchQuizzesByCategory(categoryId);
    };
    fetchQuizzes();
  }, [categoryId]);

  //show users only published quizzes
  const publishedQuizzes = quizzes.filter(quiz => quiz.isPublished);

  // Filter quizzes based on search term
  const filteredQuizzes = publishedQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {isLoading && <div className="text-center">Loading quizzes...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading &&
        !error && (
            <div className="max-w-4xl mx-auto p-4">
              <h2 className="text-2xl font-bold text-center mb-6">
                {categoryId === "all"
                  ? "Explore Quizzes"
                  : `Quizzes Under ${quizzes[0]?.category?.name}`}
              </h2>

              {/* Search Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                  >
                    <h3 className="text-xl font-semibold">{quiz.title}</h3>
                    <p className="text-gray-600">{quiz.description}</p>
                    <p className="text-gray-500">
                      Questions: {quiz.questions.length}
                    </p>
                    <Link
                      to={`/user/quizdetail/${quiz._id}`} // Use Link for navigation
                      className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Start
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
    </Layout>
  );
};

export default CategoryQuizzes;
