import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "../../App.css";
import { useResult } from "../../hooks/useResult";

const AdminResults = () => {
  const {results, isLoading, error, fetchAllResults} = useResult();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
      fetchAllResults();
  }, []);

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.user?.name,
      sortable: true,
    },
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
          className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 text-nowrap"
        >
          View Details
        </Link>
      ),
      headerClassName: "center-header",
    },
  ];

  //Filter results
  const filteredResults = results?.filter(
    (result) =>
      result.user?.name.toLowerCase().includes(filterText.toLowerCase()) ||
      result.quiz?.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <Layout role="admin">
      {isLoading && <div className="text-center">Loading results...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && (
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-4">Quiz Results</h2>
          {/* Filter Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter by User Name or Quiz Title"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full max-w-lg border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
          <DataTable
            // title="Quiz Results"
            columns={columns}
            data={filteredResults}
            pagination
            highlightOnHover
            striped
            
            style={{ fontSize: "18px" }}
          />
        </div>
      )}
    </Layout>
  );
};

export default AdminResults;
