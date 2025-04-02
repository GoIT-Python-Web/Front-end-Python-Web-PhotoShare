import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import { lazy } from "react";

// export default function App() {
//   return <>Hello,world.</>;
// }
import { Routes, Route } from "react-router-dom";
import UsersManagement from "./pages/UsersManagement/UsersManagement";
import Layout from "./Layout";

export default function App() {
  const MainPage = lazy(() => import("./pages/main/MainPage.jsx"));
  const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<MainPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Welcome Home</div>} />
        <Route path="/admin/users" element={<UsersManagement />} />
      </Route>
    </Routes>
  );
}
