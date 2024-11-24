import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PageNotFound from "./components/common/PageNotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import FAQDropdown from "./pages/user/FAQDropdown";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import UserDashboard from "./pages/user/userDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuizResult from "./pages/user/QuizResult";
import CreateCategory from "./pages/admin/CreateCategory";
import CategoryList from "./pages/user/CategoryList";
import CategoryQuizzes from "./pages/user/CategoryQuizzes";
import QuizDetails from "./pages/user/QuizDetails";
import QuizAttempt from "./pages/user/QuizAttempt";
import QuizResultList from "./pages/user/QuizResultList";
import UserProfile from "./pages/user/UserProfile";
import AboutUs from "./pages/user/AboutUs";
import AdminResults from "./pages/admin/AdminResults";
import CreateQuiz from "./pages/admin/createQuiz";
import AdminQuizzesList from "./pages/admin/AdminQuizzesList";
import AdminQuizDetail from "./pages/admin/AdminQuizDetail";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Header /> */}
      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<FAQDropdown />} />

        <Route path="/user" element={<UserRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="quizzes/:categoryId" element={<CategoryQuizzes />} />
          <Route path="quizdetail/:quizId" element={<QuizDetails />} />
          <Route path="quiz/:quizId/attempt" element={<QuizAttempt />} />
          <Route path="resultlist" element={<QuizResultList />} />
          <Route path="result" element={<QuizResult />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="category" element={<CreateCategory />} />
          <Route path="profile" element={<UserProfile role="admin" />} />
          <Route path="result" element={<AdminResults />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
          <Route path="allquiz" element={<AdminQuizzesList />} />
          <Route path="quiz/:quizId" element={<AdminQuizDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
