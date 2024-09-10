import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={ <PageNotFound/> }/>
        <Route path="/" element={ <Dashboard/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/signup" element={ <Signup/> }/>
      </Routes>
    </>
  );
}

export default App;
