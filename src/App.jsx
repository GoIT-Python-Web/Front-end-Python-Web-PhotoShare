import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "./index.css";
import Layout from "./Layout";
import Loader from "./components/common/loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { getUser, refreshTokens } from "./store/auth/operations.js";
import { RestrictedRoute } from "./routes/RestrictedRoute.jsx";
import { PrivateRoute } from "./routes/PrivateRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { toggleUserRole } from "./store/users/operations.js";
import { AdminRoute } from "./routes/AdminRoute.jsx";

export default function App() {
  const MainPage = lazy(() => import("./pages/main/MainPage.jsx"));
  const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
  const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage.jsx"));
  const ProfileEditPage = lazy(() =>
    import("./pages/ProfileEditPage/ProfileEditPage.jsx")
  );
  const CreatePostPage = lazy(() =>
    import("./pages/CreatePostPage/CreatePostPage.jsx")
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
            path="/profile/:id"
            element={
              <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
            }
          />

          <Route
            path="admin/users"
            element={
              <AdminRoute
                redirectTo="/posts"
                component={<UsersManagementPage />}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route
            path="profile-edit"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<ProfileEditPage />}
              />
            }
          />
          <Route
            path="posts/create"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<CreatePostPage />}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
