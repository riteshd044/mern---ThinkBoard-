import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import RouteLoader from "./components/RouteLoader";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  if(isCheckingAuth && !authUser){
    return <RouteLoader text="Loading your workspace..." />;
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/singup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/create" element={authUser ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/note/:id" element={authUser ? <NoteDetailPage /> : <Navigate to="/login" />} />
        <Route path="*" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster
      />
    </div>
  );
};

export default App;
