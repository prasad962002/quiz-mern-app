import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import DataTable from "react-data-table-component";
import { useResult } from "../../hooks/useResult";

const QuizResultList = () => {
  const { user } = useAuthContext(); // Get user data from context
  const {results, isLoading, error, fetchAllResultsByUserId} = useResult()
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view quiz results.");
      return;
    }
    fetchAllResultsByUserId(user._id)
   }, [user]);

  const columns = [
    {
      name: "Quiz Title",
      selector: (row) => row.quiz?.title || "Quiz deosn't exists",
      sortable: true,
    },
    {
      name: "Score",
      selector: (row) => `${row.score}%`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          to={`/user/result`}
          state={{ result: row }}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      ),
    },
  ];

  //Filter results
  const filteredResults = results?.filter((result) =>
    result.quiz?.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <Layout>
      {isLoading && <div className="text-center">Loading results...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && (
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-4"> Results</h2>
          <DataTable
            columns={columns}
            data={filteredResults}
            pagination
            highlightOnHover
            striped
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Filter by Quiz Title"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
            }
            style={{ fontSize: "18px" }}
          />
        </div>
      )}
    </Layout>
  );
};

export default QuizResultList;
