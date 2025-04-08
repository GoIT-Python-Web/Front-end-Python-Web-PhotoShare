import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "./index.css";
import Layout from "./Layout";
import Loader from "./components/common/loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { getUser } from "./store/auth/operations.js";
import { RestrictedRoute } from "./routes/RestrictedRoute.jsx";
import { PrivateRoute } from "./routes/PrivateRoute.jsx";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/posts" component={<AuthPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/posts" component={<AuthPage />} />
          }
        />

        <Route element={<Layout />}>
          <Route index element={<Navigate to="/posts" replace />} />
          <Route path="posts" element={<MainPage />} />
          <Route path="posts/:id" element={<ViewPublicationPage />} />
          <Route
            path="/my-profile"
            element={
              <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
            }
          />
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="admin/users" element={<UsersManagementPage />} />
          <Route path="about" element={<About />} />
          <Route path="profile-edit" element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
