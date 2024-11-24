import { useQuiz } from "../../hooks/useQuiz";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const AdminQuizzesList = () => {
  const { quizzes = [], fetchAllQuizzes, deleteQuizById, togglePublishQuiz, isLoading, error } = useQuiz();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuizById(quizId);
      fetchAllQuizzes();
    }
  };

  const handleTogglePublish = async (quizId) => {
    await togglePublishQuiz(quizId);
    fetchAllQuizzes();
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "30%", // Set a fixed width for the Title column
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      sortable: true,
      width: "20%", // Set a fixed width for the Category column
    },
    {
      name: "Published",
      selector: (row) => (row.isPublished ? "Yes" : "No"),
      sortable: true,
      width: "20%", // Set a fixed width for the Published column
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            to={`/admin/quiz/${row._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            View Details
          </Link>
          <button
            onClick={() => handleTogglePublish(row._id)}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition w-full sm:w-auto ${row.isPublished ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {row.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => handleDeleteQuiz(row._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      ),
      width: "30%", // Set a fixed width for the Actions column
    },
  ];

  const filteredResults = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Layout role="admin">
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center  mb-6">All Quizzes</h2>

        {/* Filter Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter by Quiz Title"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full max-w-lg border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredResults}
          pagination
          paginationPerPage={10}
          highlightOnHover
          striped
          responsive
          progressPending={isLoading}
          progressComponent={<div className="text-center text-gray-500">Loading...</div>}
          noDataComponent={<div className="text-center text-gray-500">No quizzes available</div>}
        />
      </div>
    </Layout>
  );
};

export default AdminQuizzesList;
