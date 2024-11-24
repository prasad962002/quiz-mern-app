import { Helmet } from "react-helmet";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

const Layout = ({
  children,
  title = "Quiz App", // Default parameter
  description = "Quiz App project", // Default parameter
  keywords = "quiz, mern, react, node, mongodb", // Default parameter
  author = "Prasad", // Default parameter
  role = "user", // Default parameter
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      
      {role === "admin" ? <AdminHeader /> : <Header />}
      <main style={{ minHeight: "70vh", paddingTop: "80px" }} className="bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;
