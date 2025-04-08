import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import Layout from "./Layout";
import Loader from "./components/common/loader/Loader.jsx";

export default function App() {
  const MainPage = lazy(() => import("./pages/main/MainPage.jsx"));
  const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
  const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage.jsx"));
  const ProfileEditPage = lazy(() =>
    import("./pages/ProfileEditPage/ProfileEditPage.jsx")
  );
  const ViewPublicationPage = lazy(() =>
    import("./pages/view/ViewPublicationPage.jsx")
  );
  const UsersManagementPage = lazy(() =>
    import("./pages/users/UsersManagementPage.jsx")
  );
  const About = lazy(() => import("./pages/about/About.jsx"));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        <Route element={<Layout />}>
          <Route index element={<Navigate to="/posts" replace />} />
          <Route path="posts" element={<MainPage />} />
          <Route path="posts/view" element={<ViewPublicationPage />} />
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="admin/users" element={<UsersManagementPage />} />
          <Route path="about" element={<About />} />
          <Route path="profile-edit" element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
