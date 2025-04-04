import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import Layout from "./Layout";
import Loader from "./components/UI/loader/Loader.jsx";
import UsersManagementPage from "./pages/users/UsersManagementPage.jsx";

export default function App() {
  const MainPage = lazy(() => import("./pages/main/MainPage.jsx"));
  const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
  const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage.jsx"));
  const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<MainPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/admin/users" element={<UsersManagementPage />} />
      </Routes>
    </Suspense>
  );
}
