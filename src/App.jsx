import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import { lazy } from "react";
import UsersManagementPage from "./pages/UsersManagement/UsersManagementPage.jsx";

export default function App() {
  const MainPage = lazy(() => import("./pages/main/MainPage.jsx"));
  const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
  const SignUpPage = lazy(() => import("./pages/auth/SignUpPage.jsx"));

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<MainPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route
          path="/register"
          element={
            <SignUpPage/>
          }
        />
        <Route path="/admin/users" element={<UsersManagementPage />} />
      </Routes>
    </Layout>
  );
}
