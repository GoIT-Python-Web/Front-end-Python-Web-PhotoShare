import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import { lazy } from "react";
import RestrictedRoute from "./components/RestrictedRoute";

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
            <RestrictedRoute redirectTo="/my-profile" component={<SignUpPage />} />
          }
        />
      </Routes>
    </Layout>
  );
}
